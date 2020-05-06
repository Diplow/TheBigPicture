from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture, Rating, SUBJECT_CODE
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly, IsAuthor, IsReadOnly

from django.http import HttpResponse
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector

import json
import datetime


class NewsSubjectsViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE).order_by('-modification_date')
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_queryset(self):
		return self.queryset.filter(author=self.request.user)
