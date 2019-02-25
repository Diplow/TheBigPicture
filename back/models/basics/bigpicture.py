from django.db.models import ManyToManyField
from django.db.models import URLField
from django.db.models import CharField

from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer
from back.models.basics.resource import Resource


class BigPicture(ArguableElement):
	resources = ManyToManyField(Resource, blank=True, related_name="bigpictures")
	bigpictures = ManyToManyField("self", blank=True)
	hashtags = CharField(max_length=200)
	img = URLField(blank=True)


class BigPictureSerializer(ArguableElementSerializer):

	class Meta:
		model = BigPicture
		fields = "__all__"
		read_only_fields = ("_type",)
