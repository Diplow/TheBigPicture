from rest_framework.viewsets import ModelViewSet
from back.models import Argument
from back.models import ArgumentSerializer


class ArgumentViewSet(ModelViewSet):
    """
    API endpoint that allows arguments to be viewed or edited.
    """
    queryset = Argument.objects.all()
    serializer_class = ArgumentSerializer
