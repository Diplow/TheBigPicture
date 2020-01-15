from rest_framework import serializers
from api.models import Rating, BigPicture, BaseUser
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
			author_id=validated_data.get("author").id,
			target_bp=validated_data.get("target_bp", None),
			target_rating=validated_data.get("target_rating", None)
		)
		if existingRating.exists():
			rating = existingRating.first()
			rating.value = validated_data["value"]
			rating.reason = validated_data["reason"]
			rating.endorsment = validated_data.get("endorsment", None)
			rating.target_rating = validated_data.get("target_rating", rating.target_rating)
			rating.target_bp = validated_data.get("target_bp", rating.target_bp)
			rating.save()
			return rating
		return super(RatingSerializer, self).create(validated_data)


	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_rating=obj.id).count()
