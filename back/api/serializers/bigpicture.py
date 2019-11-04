
from django.db.models import Avg, StdDev
from rest_framework import serializers
from api.models import BigPicture, BaseUser
from api.serializers.user import UserSerializer
import math


def median_value(queryset, term):
    count = queryset.count()
    if count == 0:
    	return 0
    return queryset.values_list(term, flat=True).order_by(term)[math.trunc(count/2)]


class BigPictureChildSerializer(serializers.ModelSerializer):
	kind = serializers.IntegerField()
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	author = UserSerializer(read_only=True)
	ratings = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratings(self, obj):
		res = []
		ratings = obj.ratings.all()
		for user in set([obj.author.id, self.context["author"], self.context["target"]]):
			rating = ratings.filter(author=user, target=obj)
			if rating.exists():
				res.append({
					"author": user,
					"value": rating[0].value,
					"target": obj.id,
					"subject": obj.id if obj.subject is None else obj.subject.id,
					"date": rating[0].date
				})
		return res


class BigPictureSerializer(serializers.ModelSerializer):
	children = BigPictureChildSerializer(many=True, read_only=True)
	family = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	kind = serializers.IntegerField()
	ratings = serializers.SerializerMethodField(read_only=True)
	author = UserSerializer(read_only=True)
	author_id = serializers.PrimaryKeyRelatedField(source='author',  queryset=BaseUser.objects.all(), )

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratings(self, obj):
		res = []
		ratings = obj.ratings.all()
		for user in set([obj.author.id, self.context["author"], self.context["target"]]):
			rating = ratings.filter(author=user, target=obj)
			if rating.exists():
				res.append({
					"author": user,
					"value": rating[0].value,
					"target": obj.id,
					"subject": obj.id if obj.subject is None else obj.subject.id,
					"date": rating[0].date
				})
		return res
