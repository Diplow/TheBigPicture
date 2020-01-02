from rest_framework.viewsets import ModelViewSet
from api.models import Rating
from api.serializers import RatingSerializer
from api.permissions import IsAuthorOrReadOnly


class RatingViewSet(ModelViewSet):
	queryset = Rating.objects.all()
	serializer_class = RatingSerializer
	permission_classes = [IsAuthorOrReadOnly]

	def get_queryset(self):
		queryset = self.queryset
		author = self.request.query_params.get('author', None)
		ratingauthor = self.request.query_params.get('ratingauthor', None)
		bp = self.request.query_params.get('bigpicture', None)
		if author is not None:
			queryset = queryset.filter(author=author)
		if ratingauthor is not None:
			queryset = queryset.filter(author=ratingauthor).exclude(subject__author=ratingauthor).distinct('subject')
		if bp is not None:
			queryset = queryset.filter(target_bp=bp)
		return queryset

	def create(self, request):
		request.data["author_id"] = request.user.id
		return super().create(request)
