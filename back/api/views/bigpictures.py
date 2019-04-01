from rest_framework.viewsets import ModelViewSet
from api.models import BigPicture
from api.serializers import BigPictureSerializer
from api.permissions import IsAuthorOrReadOnly


class BigPictureViewSet(ModelViewSet):
	queryset = BigPicture.objects.all()
	serializer_class = BigPictureSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_queryset(self):
		queryset = self.queryset
		element = self.request.query_params.get('element', None)
		if element == "root":
			queryset = queryset.filter(resourceFor=None)
		elif element is not None:
			queryset = queryset.filter(id=element)
			if len(queryset) == 1:
				queryset = queryset[0].resources.all()
		return queryset

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)
