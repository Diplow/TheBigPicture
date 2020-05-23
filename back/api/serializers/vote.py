from rest_framework import serializers
from api.models import Rating, Endorsment, BigPicture, BaseUser
from api.serializers.user import UserSerializer
from api.serializers.bigpicture import BigPictureChildSerializer


class RatingChildSerializer(serializers.ModelSerializer):
  subject = serializers.PrimaryKeyRelatedField(read_only=True)

  class Meta:
    model = Rating
    fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
  basisCount = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = Rating
    fields = "__all__"

  def get_basisCount(self, obj):
    return obj.endorsments.all().count()


class EndorsmentSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  target = RatingSerializer(read_only=True)
  target_id = serializers.PrimaryKeyRelatedField(source='target',  queryset=Rating.objects.all(), )
  author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )

  class Meta:
    model = Endorsment
    fields = "__all__"


class RatingWithContextSerializer(RatingSerializer):
  context = serializers.SerializerMethodField(read_only=True)

  def get_context(self, obj):

    def get_bp_context(bp):
      if bp is None:
        return []
      return [bp] + get_bp_context(bp.parent)

    def get_rating_context(rating, context):
      if rating.target_rating is None:
        context["bigpictures"] = get_bp_context(rating.target_bp)
        return context
      context["ratings"].append(rating.target_rating)
      return get_rating_context(rating.target_rating, context)

    res = get_rating_context(obj, { "ratings": []})
    return {
      "bigpictures": [BigPictureChildSerializer(bp).data for bp in res["bigpictures"]],
      "ratings": [RatingChildSerializer(rtg).data for rtg in res["ratings"]]
    }
