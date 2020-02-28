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
		if "subject" in request.data and request.data["subject"] is not None:
			subject = BigPicture.objects.get(id=request.data["subject"])
			parent = BigPicture.objects.get(id=request.data["parent"])
			if subject.author.id != request.user.id or parent.author.id != request.user.id:
				return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu à un sujet dont vous n'êtes pas l'auteur."}), status=400)
			if parent.id != subject.id:
				if parent.kind == SUBJECT_CODE:
					request.data["subject"] = parent.id
					request.data["private"] = parent.private
				else:
					request.data["subject"] = parent.subject.id
					request.data["private"] = parent.subject.private
		else:
			assert request.data["kind"] == SUBJECT_CODE
		return super().create(request)

	def partial_update(self, request, pk=None):
		if "subject" in request.data and request.data["subject"] is not None:
			subject = BigPicture.objects.get(id=request.data["subject"])
			parent = BigPicture.objects.get(id=request.data["parent"])
			if parent.subject is not None:
				if parent.subject.id != subject.id:
					request.data["subject"] = parent.subject.id
					request.data["private"] = parent.subject.private
			else:
				if parent.id != subject.id:
					request.data["subject"] = parent.id
					request.data["private"] = parent.private
			if (request.data["subject"] != subject.id):
				subject = BigPicture.objects.get(id=request.data["subject"])
			if subject.author.id != request.user.id or parent.author.id != request.user.id:
				return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter un contenu à un sujet dont vous n'êtes pas l'auteur."}), status=400)
			if parent.id != subject.id:
				if parent.kind == SUBJECT_CODE:
					request.data["subject"] = parent.id
					request.data["private"] = parent.private
				else:
					request.data["subject"] = parent.subject.id
					request.data["private"] = parent.subject.private
		else:
			assert request.data["kind"] == SUBJECT_CODE

		return super().partial_update(request, pk)

