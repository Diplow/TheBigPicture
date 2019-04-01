from api.models import Argument
from api.serializers import ArgumentSerializer
from api.views.bigpictures import BigPictureViewSet


class ArgumentViewSet(BigPictureViewSet):
	serializer_class = ArgumentSerializer
	queryset = Argument.objects.all()

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element is not None:
			queryset = queryset.filter(resourceFor=element)
		return queryset
