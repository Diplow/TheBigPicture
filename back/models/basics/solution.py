from django.db.models import ForeignKey

from back.models.element import ArguableElement
from back.models.element import ArguableElementSerializer
from back.models.basics.problem import Problem


class Solution(ArguableElement):
	issue = ForeignKey(Problem, related_name="solutions", on_delete=True)


class SolutionSerializer(ArguableElementSerializer):

	class Meta:
		model = Solution
		fields = "__all__"
		read_only_fields = ("_type",)
