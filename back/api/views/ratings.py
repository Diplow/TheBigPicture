from rest_framework.viewsets import ModelViewSet
from api.models import Rating
from api.serializers import RatingSerializer
from api.permissions import IsAuthor


class RatingViewSet(ModelViewSet):
	queryset = Rating.objects.all()
	serializer_class = RatingSerializer
	permission_classes = [IsAuthor]

	def get_queryset(self):
		queryset = self.queryset
		author = self.request.query_params.get('author', None)
		ratingauthor = self.request.query_params.get('ratingauthor', None)
		if author is not None:
			queryset = queryset.filter(author=author)
		if ratingauthor is not None:
			queryset = queryset.filter(author=ratingauthor).distinct('subject')
		return queryset

	def create(self, request):
		request.data["author"] = request.user.id
		return super().create(request)
