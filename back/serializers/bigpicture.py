
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField
from back.models import BigPicture


class BigPictureSerializer(ModelSerializer):
	resources = PrimaryKeyRelatedField(many=True, read_only=True, required=False)

	class Meta:
		model = BigPicture
		fields = "__all__"
