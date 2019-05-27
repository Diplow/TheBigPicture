from rest_framework import serializers
from api.models import Rating, BigPicture, ARGUMENT_CODE


class RatingSerializer(serializers.ModelSerializer):
	reasons = serializers.PrimaryKeyRelatedField(queryset=BigPicture.objects.filter(kind=ARGUMENT_CODE), many=True, required=False)

	class Meta:
		model = Rating
		fields = "__all__"

	def create(self, validated_data):
		existingRating = Rating.objects.filter(
			author=validated_data["author"],
			target=validated_data["target"],
			votation=validated_data["votation"]
		)
		if existingRating.exists():
			rating = existingRating.first()
			rating.value = validated_data["value"]
			if "reasons" in validated_data:
				rating.reasons.set(validated_data["reasons"])
			rating.save()
			return rating
		return super(RatingSerializer, self).create(validated_data)