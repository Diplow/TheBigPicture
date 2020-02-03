
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.conf.settings import AUTH_USER_MODEL
from api.models.bigpicture import BigPicture
import datetime
import statistics


class Rating(models.Model):
	value = models.FloatField(default=0.)
	target_bp = models.ForeignKey(BigPicture, blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
	target_rating = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
	author = models.ForeignKey(AUTH_USER_MODEL, blank=True, on_delete=models.CASCADE)
	subject = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='subjectratings')
	date = models.DateField(default=datetime.date.today)
	reason = models.TextField(blank=True)
	endorsment = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name='endorsments')

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target_rating', 'author'], name='unique_rating_on_rating'),
			models.UniqueConstraint(fields=['target_bp', 'author'], name='unique_rating_on_bp')
		]

	def __unicode__(self):
		return self.id
