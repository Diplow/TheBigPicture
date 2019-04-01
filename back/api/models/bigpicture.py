from django.db.models import Model
from django.db.models import ForeignKey
from django.db.models import TextField
from django.db.models import CharField
from django.db.models import CASCADE
from django.contrib.auth.models import User


class BigPicture(Model):
	title = CharField(max_length=150)
	body = TextField()
	resourceFor = ForeignKey("self", blank=True, null=True, on_delete=CASCADE, related_name="resources")
	hashtags = CharField(max_length=200, blank=True)
	author = ForeignKey(User, on_delete=CASCADE)

	def __unicode__(self):
		return self.id

	def __str__(self):
		return "[BigPicture] - {title} - {id}".format(title=self.title, id=self.id)
