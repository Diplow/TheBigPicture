from rest_framework import serializers
from api.models import Rating, BigPicture, ARGUMENT_CODE


class RatingSerializer(serializers.ModelSerializer):

	class Meta:
		model = Rating
		fields = "__all__"

	def create(self, validated_data):
		existingRating = Rating.objects.filter(
			author=validated_data["author"],
			target=validated_data["target"]
		)
		if existingRating.exists():
			rating = existingRating.first()
			rating.value = validated_data["value"]
			rating.save()
			return rating
		return super(RatingSerializer, self).create(validated_data)
