from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture, Rating, SUBJECT_CODE
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly, IsAuthor

from django.http import HttpResponse

import json
import datetime


class OwnSubjectViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE).order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthor]


class SubjectViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE, private=False).order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_queryset(self):
		queryset = self.queryset
		author = self.request.query_params.get('author', None)
		ratingauthor = self.request.query_params.get('ratingauthor', None)
		reference = self.request.query_params.get('reference', None)
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
		request.data["author_id"] = request.user.id
		return super().create(request)

	def partial_update(self, request, pk=None):

		def change_parent(obj, new_parent):
			obj.parent = new_parent
			obj.subject = new_parent.subject
			obj.private = new_parent.private
			obj.save()
			for elt in BigPicture.objects.filter(parent=obj):
				change_parent(elt, obj)

		item = BigPicture.objects.get(id=pk)
		if item.parent.id != request.data["parent"]:
			new_parent = BigPicture.objects.get(id=request.data["parent"])
			if new_parent.author.id != request.user.id:
				return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu à un sujet dont vous n'êtes pas l'auteur."}), status=400)
			change_parent(item, new_parent)
			del request.data["subject"]
		return super().partial_update(request, pk)

