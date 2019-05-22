from rest_framework.serializers import ModelSerializer
from api.models import Rating


class RatingSerializer(ModelSerializer):

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
			rating.reasons.set(validated_data["reasons"])
			rating.save()
			return rating
		return super(RatingSerializer, self).create(validated_data)