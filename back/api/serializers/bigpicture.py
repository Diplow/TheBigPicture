
from django.db.models import Avg, StdDev
from rest_framework import serializers
from api.models import BigPicture, BaseUser, Rating
from api.serializers.user import UserSerializer
from api.serializers.vote import RatingSerializer
import math


def median_value(queryset, term):
    count = queryset.count()
    if count == 0:
    	return 0
    return queryset.values_list(term, flat=True).order_by(term)[math.trunc(count/2)]


class BigPictureChildSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id).count()

class BigPictureSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	family = BigPictureChildSerializer(many=True, read_only=True)
	subjectratings = RatingSerializer(many=True, read_only=True)
	kind = serializers.IntegerField()
	author = UserSerializer(read_only=True)
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )
	ratingCount = serializers.SerializerMethodField()

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratingCount(self, obj):
		return Rating.objects.filter(target_bp=obj.id).count()
