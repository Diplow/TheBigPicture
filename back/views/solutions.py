from rest_framework.viewsets import ModelViewSet
from back.models import Solution, SolutionSerializer


class SolutionViewSet(ModelViewSet):
    """
    API endpoint that allows solutions to be viewed or edited.
    """
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
