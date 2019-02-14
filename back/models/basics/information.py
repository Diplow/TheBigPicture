
from django.db.models import CharField

from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer


class Information(ArguableElement):
	source = CharField(max_length=150)


class InformationSerializer(ArguableElementSerializer):

	class Meta:
		model = Information
		fields = "__all__"
		read_only_fields = ("_type",)
