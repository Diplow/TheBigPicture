
from django.db import models
from api.models.bigpicture import BigPicture
from api.models.user import BaseUser
import datetime
import statistics


class Rating(models.Model):
	value = models.FloatField(default=0.)
	target = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='ratings')
	author = models.ForeignKey(BaseUser, blank=True, on_delete=models.CASCADE)
	subject = models.ForeignKey(BigPicture, on_delete=models.CASCADE, related_name='subjectratings')
	date = models.DateField(default=datetime.date.today)

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target', 'author'], name='unique_rating')
		]

	def __unicode__(self):
		return self.id
