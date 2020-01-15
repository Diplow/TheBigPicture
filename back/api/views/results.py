
from api.models import BigPicture, Rating
from django.http import HttpResponse
import json
import math


def bigPictureResults(request, pk):
	results = compute_results("target_bp", pk)
	return HttpResponse(json.dumps(results), status=200)


def ratingResults(request, pk):
	results = compute_results("target_rating", pk)
	return HttpResponse(json.dumps(results), status=200)


def median_value(queryset, term):
    count = queryset.count()
    if count == 0:
    	return 0
    return queryset.values_list(term, flat=True).order_by(term)[math.trunc(count/2)]

def compute_results(target_field_name, itemId):
	kwargs = {}
	kwargs[target_field_name] = itemId
	ratings = Rating.objects.filter(**kwargs)
	res = {
	 str(n)+"star": ratings.filter(value=n).count()
	 for n in range(6)
	}
	res["count"] = ratings.count()
	res["median"] = median_value(ratings.exclude(value=0), "value")
	return res

