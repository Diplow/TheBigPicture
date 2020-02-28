
from rest_framework import serializers
from api.models import BigPicture, BaseUser, Rating
from api.serializers.user import UserSerializer
from api.serializers.vote import RatingSerializer


class BigPictureChildSerializer(serializers.ModelSerializer):
	children = serializers.SerializerMethodField()
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()
	referenceCount = serializers.SerializerMethodField()
	hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.filter(private=False), )

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_children(self, obj):
		return [a.id for a in BigPicture.objects.filter(parent=obj.id, private=False)]

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id, endorsment=None).exclude(reason="").count()

	def get_referenceCount(self, obj):
		return BigPicture.objects.filter(hyperlink=obj.id, private=False).distinct('subject').count()


class BigPictureSerializer(serializers.ModelSerializer):
	hyperlink = BigPictureChildSerializer(many=False, read_only=True)
	hyperlink_id = serializers.PrimaryKeyRelatedField(required=False, source='hyperlink', queryset=BigPicture.objects.filter(private=False), )
	kind = serializers.IntegerField()
	author = UserSerializer(read_only=True)
	author_id = serializers.PrimaryKeyRelatedField(source='author', queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()
	referenceCount = serializers.SerializerMethodField()
	family = serializers.SerializerMethodField()
	children = serializers.SerializerMethodField()

	class Meta:
		model = BigPicture
		fields = "__all__"


	def get_family(self, obj):
		return [BigPictureChildSerializer(a).data for a in BigPicture.objects.filter(subject=obj.id, private=False)]

	def get_children(self, obj):
		return [a.id for a in BigPicture.objects.filter(parent=obj.id, private=False)]

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id, endorsment=None).exclude(reason="").count()

	def get_referenceCount(self, obj):
		return BigPicture.objects.filter(hyperlink=obj.id).distinct('subject').count()

