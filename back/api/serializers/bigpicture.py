
from rest_framework import serializers
from api.models import BigPicture, BaseUser, Rating
from api.serializers.user import UserSerializer
from api.serializers.vote import RatingSerializer


class BigPictureChildSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()
	referenceCount = serializers.SerializerMethodField()
	hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.all(), )

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id, endorsment=None).exclude(reason="").count()

	def get_referenceCount(self, obj):
		return BigPicture.objects.filter(hyperlink=obj.id).distinct('subject').count()


class BigPictureSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	family = BigPictureChildSerializer(many=True, read_only=True)
	hyperlink = BigPictureChildSerializer(many=False, read_only=True)
	hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.all(), )
	kind = serializers.IntegerField()
	author = UserSerializer(read_only=True)
	author_id = serializers.PrimaryKeyRelatedField(source='author', queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()
	referenceCount = serializers.SerializerMethodField()

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id, endorsment=None).exclude(reason="").count()

	def get_referenceCount(self, obj):
		return BigPicture.objects.filter(hyperlink=obj.id).distinct('subject').count()

