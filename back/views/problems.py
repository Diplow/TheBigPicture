from rest_framework.viewsets import ModelViewSet
from back.models import Problem, ProblemSerializer


class ProblemViewSet(ModelViewSet):
    """
    API endpoint that allows problems to be viewed or edited.
    """
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
