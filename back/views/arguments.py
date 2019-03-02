from rest_framework.viewsets import ModelViewSet
from back.models import Argument
from back.serializers import ArgumentSerializer


class ArgumentViewSet(ModelViewSet):
	serializer_class = ArgumentSerializer
	queryset = Argument.objects.all()

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element is not None:
			queryset = queryset.filter(bigPicture=element)
		return queryset
