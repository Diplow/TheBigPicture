
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from api.models.bigpicture import BigPicture
from api.models.user import BaseUser
import datetime
import statistics


class Rating(models.Model):
	value = models.FloatField(default=0.)
	target_bp = models.ForeignKey(BigPicture, blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
	target_rating = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name='ratings')
	author = models.ForeignKey(BaseUser, blank=True, on_delete=models.CASCADE)
	subject = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='subjectratings')
	date = models.DateField(default=datetime.date.today)
	reason = models.TextField(blank=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target_bp', 'target_rating', 'author'], name='unique_rating')
		]

	def __unicode__(self):
		return self.id
