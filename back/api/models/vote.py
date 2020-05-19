
from django.db import models
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
  date = models.DateField(default=datetime.date.today)
  body = models.TextField(blank=True)

  def __unicode__(self):
    return self.id


class Endorsment(models.Model):
  value = models.FloatField(default=0.)
  target =  models.ForeignKey(Rating, on_delete=models.CASCADE, related_name="endorsments")
  date = models.DateField(default=datetime.date.today)
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['target', 'author'], name='unique_endorsment')
    ]
