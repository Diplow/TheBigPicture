from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse

import json
from api.models import Rating
from api.serializers import RatingSerializer
from api.permissions import IsAuthorOrReadOnly


class RatingViewSet(ModelViewSet):
	queryset = Rating.objects.all().exclude(reason="")
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
		if (request.data["value"] == 6):
			endorsment = Rating.objects.get(id=request.data["target_rating"])
			if request.user.id == endorsment.author_id:
				return HttpResponse(json.dumps({"error": "Vous ne pouvez pas adhérer à votre propre commentaire."}), status=400)
			request.data["value"] = endorsment.value
			request.data["reason"] = endorsment.reason
			request.data["endorsment"] = endorsment.id
			request.data["target_rating"] = endorsment.target_rating.id if endorsment.target_rating is not None else None
			request.data["target_bp"] = endorsment.target_bp.id if endorsment.target_bp is not None else None
		return super().create(request)
