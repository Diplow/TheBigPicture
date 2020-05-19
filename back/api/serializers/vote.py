from rest_framework import serializers
from api.models import Rating, Endorsment, BigPicture, BaseUser
from api.serializers.user import UserSerializer


class RatingSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
  endorsmentCount = serializers.IntegerField(read_only=True)

  class Meta:
    model = Rating
    fields = "__all__"


class EndorsmentSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  target = RatingSerializer(read_only=True)
  target_id = serializers.PrimaryKeyRelatedField(source='target',  queryset=Rating.objects.all(), )
  author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )

  class Meta:
    model = Endorsment
    fields = "__all__"
