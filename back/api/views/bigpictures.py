from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture, BIGPICTURE_CODE, VOTATION_CODE
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly
import json
import datetime


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
		if element == "root":
			queryset = queryset.filter(resourceFor=None)
			votations = BigPicture.objects.filter(kind=VOTATION_CODE, deadline__gt=datetime.datetime.now())
			queryset = queryset | votations
		elif element is not None:
			elt = queryset.get(id=element)
			queryset = elt.resources.all() | elt.choices.all()
		return queryset

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)