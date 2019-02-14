
from django.db.models import IntegerField
from django.db.models import ForeignKey

from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer


class Argument(ArguableElement):
	nature = IntegerField(choices=((1, "pro"), (2, "con")))
	obj = ForeignKey(ArguableElement, related_name="arguments", on_delete=True)


class ArgumentSerializer(ArguableElementSerializer):

	class Meta:
		model = Argument
		fields = "__all__"
