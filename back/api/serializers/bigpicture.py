
from django.db.models import Avg, StdDev
from rest_framework import serializers
from api.models import BigPicture
import math


def median_value(queryset, term):
    count = queryset.count()
    if count == 0:
    	return 0
    return queryset.values_list(term, flat=True).order_by(term)[math.trunc(count/2)]


class BigPictureSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	kind = serializers.IntegerField()
	results = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_results(self, obj):
		bpAuthor = obj.author
		author = self.context["author"]
		target = self.context["target"]
		ratings = obj.ratings.all()
		authorrating = ratings.filter(author=bpAuthor)
		ownrating = ratings.filter(author=author)
		targetrating = ratings.filter(author=target)
		return {
			"count": ratings.count(),
			"median": median_value(ratings, 'value'),
			"average": ratings.aggregate(Avg('value'))['value__avg'],
			"author": authorrating[0].value if authorrating.exists() else 0,
			author: ownrating[0].value if ownrating.exists() else 0,
			target: targetrating[0].value if targetrating.exists() else 0,
			"0star": ratings.filter(value=0).count(),
			"1star": ratings.filter(value=1).count(),
			"2stars": ratings.filter(value=2).count(),
			"3stars": ratings.filter(value=3).count(),
			"4stars": ratings.filter(value=4).count(),
			"5stars": ratings.filter(value=5).count(),
		}
