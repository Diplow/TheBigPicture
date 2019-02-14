from rest_framework.viewsets import ModelViewSet
from back.models import ArguableElement, ArguableElementSerializer


class ElementViewSet(ModelViewSet):
    """
    API endpoint that allows elements to be viewed or edited.
    """
    queryset = ArguableElement.objects.all()
    serializer_class = ArguableElementSerializer
