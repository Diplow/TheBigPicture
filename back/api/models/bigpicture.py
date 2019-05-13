from django.db import models
from django.contrib.auth.models import User
import datetime


BIGPICTURE_CODE = 1
ARGUMENT_CODE = 2
VOTATION_CODE = 3


class BigPicture(models.Model):
	title = models.CharField(max_length=150)
	body = models.TextField()
	kind = models.IntegerField(choices=(("bigPicture", BIGPICTURE_CODE), ("argument", ARGUMENT_CODE), ("votation", VOTATION_CODE)))
	resourceFor = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name="resources")
	hashtags = models.CharField(max_length=200, blank=True)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	creationDate = models.DateField(default=datetime.date.today)

	# arg fields
	nature = models.IntegerField(blank=True, null=True, choices=((1, "pro"), (2, "con")))

	# votation fields
	choices = models.ManyToManyField("self", blank=True, related_name="votations")
	deadline = models.DateField(blank=True, null=True)

	def __unicode__(self):
		return self.id

	def __str__(self):
		return "[BigPicture] - {title} - {id}".format(title=self.title, id=self.id)
