from rest_framework.viewsets import ModelViewSet
from back.models import Resource, ResourceSerializer


class ResourceViewSet(ModelViewSet):
	queryset = Resource.objects.all()
	serializer_class = ResourceSerializer


	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element is not None:
			queryset = queryset.filter(bigpictures=element)
		return queryset
