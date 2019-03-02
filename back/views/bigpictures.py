from rest_framework.viewsets import ModelViewSet
from back.models import BigPicture
from back.serializers import BigPictureSerializer


class BigPictureViewSet(ModelViewSet):
	queryset = BigPicture.objects.all()
	serializer_class = BigPictureSerializer

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element is not None:
			queryset = queryset.filter(id=element)
			if len(queryset) == 1:
				queryset = queryset[0].resources.all()
		return queryset
