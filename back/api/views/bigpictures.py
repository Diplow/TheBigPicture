from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture, Rating, SUBJECT_CODE
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly, IsAuthor, IsReadOnly

from django.http import HttpResponse
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector

import json
import datetime


class OwnSubjectViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE).order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthor]


class SubjectViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE, private=False).order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsReadOnly]

	def get_queryset(self):
		queryset = self.queryset
		author = self.request.query_params.get('author', None)
		ratingauthor = self.request.query_params.get('ratingauthor', None)
		reference = self.request.query_params.get('reference', None)
		search = self.request.query_params.get('search', None)
		if search is not None:
			vector = SearchVector('title', 'author__username', 'body')
			query = SearchQuery(search)
			queryset = queryset.annotate(rank=SearchRank(vector, query)).order_by('-rank')
		if reference is not None:
			references = BigPicture.objects.get(id=reference).references.all().distinct('subject').values('subject')
			queryset = queryset.filter(id__in=[r["subject"] for r in references])
		if author is not None:
			queryset = queryset.filter(author=author)
		if ratingauthor is not None:
			ratings = Rating.objects.filter(author_id=ratingauthor).distinct('subject').values('subject')
			queryset = queryset.filter(id__in=[r["subject"] for r in ratings], private=False)
		return queryset


class BigPictureViewSet(ModelViewSet):
	queryset = BigPicture.objects.all().order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def create(self, request):
		if request.user.id != int(request.data["author_id"]):
			return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu dont vous n'êtes pas l'auteur."}), status=401)
		if "parent" in request.data:
			parent = BigPicture.objects.get(id=request.data["parent"])
			if parent.author.id  != request.user.id:
				return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu à un sujet dont vous n'êtes pas l'auteur."}), status=401)

		return super().create(request)

	def partial_update(self, request, pk=None):
		if "parent" in request.data:
			update_parent(pk, request.data["parent"])
		return super().partial_update(request, pk)

def update_parent(pk, new_parent_id):
	def change_parent(obj, new_parent):
		obj.parent = new_parent
		obj.subject = new_parent.subject
		obj.private = new_parent.private
		obj.save()
		for elt in BigPicture.objects.filter(parent=obj):
			change_parent(elt, obj)

	item = BigPicture.objects.get(id=pk)
	if item.parent != None and item.parent.id != new_parent_id:
		new_parent = BigPicture.objects.get(id=new_parent_id)
		if new_parent.author.id != request.user.id:
			return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu à un sujet dont vous n'êtes pas l'auteur."}), status=400)
		change_parent(item, new_parent)
		del request.data["subject"]