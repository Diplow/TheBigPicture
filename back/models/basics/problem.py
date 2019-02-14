from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer


class Problem(ArguableElement):
	pass


class ProblemSerializer(ArguableElementSerializer):

	class Meta:
		model = Problem
		fields = "__all__"
		read_only_fields = ("_type",)
