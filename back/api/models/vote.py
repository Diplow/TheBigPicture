
from django.db import models
from django.db.models import Q
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.conf import settings
from api.models.bigpicture import BigPicture
import datetime
import statistics


class Rating(models.Model):
  target_bp = models.ForeignKey(BigPicture, blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
  target_rating = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  subject = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='subjectratings')
  date = models.DateField(auto_now_add=True)
  modification_date = models.DateTimeField(auto_now=True)

  body = models.TextField(blank=True)

  def __unicode__(self):
    return self.id

  class Meta:
    constraints = [
      models.CheckConstraint(
        check=Q(target_bp__isnull=False) | Q(target_rating__isnull=False),
        name='rating_has_target'
      ),
    ]

class Endorsment(models.Model):
  value = models.FloatField(default=0.)
  target =  models.ForeignKey(Rating, on_delete=models.CASCADE, related_name="endorsments")
  bigpicture = models.ForeignKey(BigPicture, blank=True, null=True, on_delete=models.CASCADE, related_name="targeted_endorsments")
  rating = models.ForeignKey(Rating, blank=True, null=True, on_delete=models.CASCADE, related_name="targeted_votes")
  date = models.DateField(default=datetime.date.today)
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['author', 'bigpicture'], name='unique_endorsment_bp'),
      models.UniqueConstraint(fields=['author', 'rating'], name='unique_endorsment_rtg'),
    ]
