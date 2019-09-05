
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
	# arg fields
	nature = serializers.IntegerField(required=False)
	results = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_results(self, obj):
		author = self.context["author"]
		ratings = obj.ratings.all()
		ownrating = ratings.filter(author=author)
		return {
			"count": ratings.count(),
			"median": median_value(ratings, 'value'),
			"average": ratings.aggregate(Avg('value'))['value__avg'],
			"own": ownrating[0].value if ownrating.exists() else 0,
			0: ratings.filter(value=0).count(),
			1: ratings.filter(value=1).count(),
			2: ratings.filter(value=2).count(),
			3: ratings.filter(value=3).count(),
			4: ratings.filter(value=4).count(),
			5: ratings.filter(value=5).count(),
		}
