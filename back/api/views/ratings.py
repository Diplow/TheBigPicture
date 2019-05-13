from rest_framework.viewsets import ModelViewSet
from api.models import Rating
from api.serializers import RatingSerializer
from api.permissions import IsAuthor


class RatingViewSet(ModelViewSet):
	queryset = Rating.objects.all()
	serializer_class = RatingSerializer
	permission_classes = [IsAuthor]

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)
