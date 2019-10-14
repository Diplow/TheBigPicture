from django.db import models
from api.models.user import BaseUser
import datetime

SUBJECT_CODE = 1
PROBLEM_CODE = 2
SOLUTION_CODE = 3
RESOURCE_CODE = 4
ARGUMENT_CODE = 5


class BigPicture(models.Model):
	title = models.CharField(max_length=150)
	body = models.TextField(blank=True)
	kind = models.IntegerField(choices=(
		("subject", SUBJECT_CODE),
		("problem", PROBLEM_CODE),
		("solution", SOLUTION_CODE),
		("resource", RESOURCE_CODE),
		("argument", ARGUMENT_CODE),
	))
	parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name="children")
	subject = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name="family")
	author = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
	creation_date = models.DateField(auto_now_add=True)
	modification_date = models.DateTimeField(auto_now=True)

	def __unicode__(self):
		return self.id

	def __str__(self):
		return "[{kind}] - {title} - {id}".format(kind=self.kind, title=self.title, id=self.id)

