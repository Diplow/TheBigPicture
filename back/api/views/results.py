
from api.models import BigPicture, Rating, Endorsment
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
  kwargs["target__{field}".format(field=target_field_name)] = itemId
  endorsments = Endorsment.objects.filter(**kwargs)
  res = {
    str(n)+"star": endorsments.filter(value=n).count() for n in range(6)
  }
  res["count"] = endorsments.count()
  res["median"] = median_value(endorsments, "value")
  return res

