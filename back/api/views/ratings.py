from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse

import json
from api.models import Rating, Endorsment
from api.serializers import RatingSerializer, EndorsmentSerializer
from api.permissions import IsAuthorOrReadOnly, IsAuthor



class OwnRatingViewSet(ModelViewSet):
  queryset = Rating.objects.all().order_by('-date')
  serializer_class = RatingSerializer
  permission_classes = [IsAuthor]

  def get_queryset(self):
    return self.queryset.filter(author=self.request.user)


class EndorsmentViewSet(ModelViewSet):
  queryset = Endorsment.objects.all().order_by('-date')
  serializer_class = EndorsmentSerializer
  permission_classes = [IsAuthorOrReadOnly]

  def get_queryset(self):
    target = self.request.query_params.get('target', None)
    author = self.request.query_params.get('author', None)
    if author is not None:
      self.queryset = self.queryset.filter(author=author)
    if target is not None:
      self.queryset = self.queryset.filter(target=target)
    return queryset


class RatingViewSet(ModelViewSet):
  queryset = Rating.objects.all().exclude(reason="")
  serializer_class = RatingSerializer
  permission_classes = [IsAuthorOrReadOnly]

  def get_queryset(self):
    queryset = self.queryset
    author = self.request.query_params.get('author', None)
    ratingauthor = self.request.query_params.get('ratingauthor', None)
    bp = self.request.query_params.get('bigpicture', None)
    rating = self.request.query_params.get('rating', None)
    if author is not None:
      queryset = queryset.filter(author=author)
    if ratingauthor is not None:
      queryset = queryset.filter(author=ratingauthor).distinct('subject')
    if bp is not None:
      queryset = queryset.filter(target_bp=bp)
    if rating is not None:
      queryset = queryset.filter(target_rating=rating)
    return queryset

  def create(self, request):
    if request.user.id != int(request.data["author_id"]):
      return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter une raison dont vous n'êtes pas l'auteur."}), status=401)

    if (request.data["value"] == 6):
      endorsment = Rating.objects.get(id=request.data["target_rating"])
      if request.user.id == endorsment.author_id:
        return HttpResponse(json.dumps({"error": "Vous ne pouvez pas adhérer à votre propre commentaire."}), status=400)
      request.data["value"] = endorsment.value
      request.data["reason"] = endorsment.reason
      request.data["endorsment"] = endorsment.id
      if endorsment.target_rating is not None:
        request.data["target_rating"] = endorsment.target_rating.id
      if endorsment.target_bp is not None:
        request.data["target_bp"] = endorsment.target_bp.id
    return super().create(request)
