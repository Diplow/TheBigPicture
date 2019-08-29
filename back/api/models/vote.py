
from django.db import models
from api.models.bigpicture import BigPicture
from django.contrib.auth.models import User
import datetime
import statistics


class Rating(models.Model):
	value = models.FloatField(default=0.)
	target = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='ratings')
	author = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target', 'author'], name='unique_rating')
		]

	def __unicode__(self):
		return self.id
