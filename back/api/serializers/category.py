from rest_framework import serializers
from api.models import Category


class CategorySerializer(serializers.ModelSerializer):

  class Meta:
    model = Category
    fields = "__all__"
