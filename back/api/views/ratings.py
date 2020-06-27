from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse
from django.db.models import Count

from api.models import Rating, Endorsment
from api.serializers import RatingSerializer, RatingWithContextSerializer, EndorsmentSerializer
from api.permissions import IsAuthorOrReadOnly, IsAuthor, IsReadOnly

import json


class OwnRatingViewSet(ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer
  permission_classes = [IsAuthor]

  def get_queryset(self):
    endorsments = Endorsment.objects.filter(author=self.request.user)
    return self.queryset \
      .filter(id__in=endorsments.values('target')) \
      .annotate(basisCount=Count('endorsments')) \
      .order_by('-basisCount')


class EndorsmentViewSet(ModelViewSet):
  queryset = Endorsment.objects.all().order_by('-date')
  serializer_class = EndorsmentSerializer
  permission_classes = [IsAuthorOrReadOnly]

  def get_queryset(self):
    target = self.request.query_params.get('target', None)
    author = self.request.query_params.get('author', None)
    bigpicture = self.request.query_params.get('bigpicture', None)
    rating = self.request.query_params.get('rating', None)
    if author is not None:
      self.queryset = self.queryset.filter(author=author)
    if target is not None:
      self.queryset = self.queryset.filter(target=target)
    if bigpicture is not None:
      self.queryset = self.queryset.filter(target__target_bp=bigpicture)
    if rating is not None:
      self.queryset = self.queryset.filter(target__target_rating=rating)
    return self.queryset


class RatingWithContextViewSet(ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingWithContextSerializer
  permission_classes = [IsReadOnly]


class RatingViewSet(ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer
  permission_classes = [IsAuthorOrReadOnly]

  def get_queryset(self):
    queryset = self.queryset
    author = self.request.query_params.get('author', None)
    ratingauthor = self.request.query_params.get('ratingauthor', None)
    bp = self.request.query_params.get('bigpicture', None)
    subject = self.request.query_params.get('subject', None)
    rating = self.request.query_params.get('rating', None)
    if author is not None:
      endorsments = Endorsment.objects.filter(author=author)
      queryset = queryset.filter(id__in=endorsments.values('target'))
    if ratingauthor is not None:
      queryset = queryset.filter(author=ratingauthor).distinct('subject')
    if bp is not None:
      queryset = queryset.filter(target_bp=bp)
    if rating is not None:
      queryset = queryset.filter(target_rating=rating)
    if subject is not None:
      return queryset.filter(subject=subject).order_by('-date')
    return queryset.annotate(basisCount=Count('endorsments')).order_by('-basisCount')

  def create(self, request):
    if request.user.id != int(request.data["author_id"]):
      return HttpResponse(json.dumps({"error": "Vous ne pouvez pas ajouter une raison dont vous n'êtes pas l'auteur."}), status=401)
    return super().create(request)
