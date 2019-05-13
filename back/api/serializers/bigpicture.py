
from rest_framework import serializers
from api.models import BigPicture, BIGPICTURE_CODE


class BigPictureSerializer(serializers.ModelSerializer):
	resources = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	kind = serializers.IntegerField()
	# arg fields
	nature = serializers.IntegerField(required=False)
	# votation fields
	# results = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	choices = serializers.PrimaryKeyRelatedField(queryset=BigPicture.objects.filter(kind=BIGPICTURE_CODE), many=True, required=False)
	deadline = serializers.DateField(required=False)
	ratings = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)


	class Meta:
		model = BigPicture
		fields = "__all__"
