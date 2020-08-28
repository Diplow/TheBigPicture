
from rest_framework.viewsets import ModelViewSet
from api.models import Category
from api.serializers import CategorySerializer
from api.permissions import IsAdmin
import json


class CategoryViewSet(ModelViewSet):
  """
  API endpoint that allows categories to be viewed or edited.
  """
  queryset = Category.objects.all().order_by('-label')
  permission_classes = [IsAdmin]
  serializer_class = CategorySerializer
