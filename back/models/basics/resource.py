
from django.db.models import CharField
from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer


class Resource(ArguableElement):
	source = CharField(max_length=150, blank=True)


class ResourceSerializer(ArguableElementSerializer):

	class Meta:
		model = Resource
		fields = "__all__"
		read_only_fields = ("_type",)
