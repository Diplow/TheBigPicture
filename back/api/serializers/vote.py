from rest_framework import serializers
from api.models import Rating, BigPicture, ARGUMENT_CODE, BaseUser
from api.serializers.user import UserSerializer


class RatingSerializer(serializers.ModelSerializer):
	author = UserSerializer(read_only=True)
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()

	class Meta:
		model = Rating
		fields = "__all__"

	def create(self, validated_data):
		existingRating = Rating.objects.filter(
			author=validated_data.get("author"),
			target_bp=validated_data.get("target_bp", None),
			target_rating=validated_data.get("target_rating", None),
			subject=validated_data["subject"]
		)
		if existingRating.exists():
			rating = existingRating.first()
			rating.value = validated_data["value"]
			rating.reason = validated_data["reason"]
			rating.save()
			return rating
		return super(RatingSerializer, self).create(validated_data)


	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_rating=obj.id).count()
