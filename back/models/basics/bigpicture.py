from django.db.models import ManyToManyField

from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer
from back.models.basics.problem import Problem
from back.models.basics.information import Information


class BigPicture(ArguableElement):
	problems = ManyToManyField(Problem, related_name="bigpictures")
	information = ManyToManyField(Information, related_name="bigpictures")
	bigpictures = ManyToManyField("self")


class BigPictureSerializer(ArguableElementSerializer):

	class Meta:
		model = BigPicture
		fields = "__all__"
		read_only_fields = ("_type",)
