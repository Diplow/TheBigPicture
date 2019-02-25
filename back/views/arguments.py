from rest_framework.viewsets import ModelViewSet
from back.models import Argument
from back.models import ArgumentSerializer


class ArgumentViewSet(ModelViewSet):
	serializer_class = ArgumentSerializer
	queryset = Argument.objects.all()

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element is not None:
			queryset = queryset.filter(obj=element)
		return queryset
