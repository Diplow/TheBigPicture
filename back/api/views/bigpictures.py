from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture, SUBJECT_CODE
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly
import json
import datetime


class SubjectViewSet(ModelViewSet):
	queryset = BigPicture.objects.filter(kind=SUBJECT_CODE)
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_serializer_context(self):
		context = super(SubjectViewSet, self).get_serializer_context()
		context.update({
			"author": context["request"].user.id,
			"target": context["request"].query_params.get('user', None)
		})
		return context


class BigPictureViewSet(ModelViewSet):
	queryset = BigPicture.objects.all()
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		ids = json.loads(self.request.query_params.get('ids', '[]'))
		if len(ids) != 0:
			queryset.filter(id__in=ids)
		if element is not None:
			elt = queryset.get(id=element)
			queryset = queryset.filter(parent=element)
			if elt.parent is not None:
				context = BigPicture.objects.filter(id=elt.parent.id)
				queryset |= context
		return queryset

	def get_serializer_context(self):
		context = super(BigPictureViewSet, self).get_serializer_context()
		context.update({
			"author": context["request"].user.id,
			"target": context["request"].query_params.get('user', None)
		})
		return context

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)