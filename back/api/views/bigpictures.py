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
			queryset = BigPicture.objects.filter(kind=VOTATION_CODE)
		elif element is not None:
			elt = queryset.get(id=element)
			queryset = elt.resources.all()
			if elt.resourceFor is not None:
				context = BigPicture.objects.filter(id=elt.resourceFor.id)
				queryset |= context
			if elt.choices is not None:
				queryset |= elt.choices.all()
				for c in elt.choices.all():
					queryset |= c.resources.all()
		return queryset

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)