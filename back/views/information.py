from rest_framework.viewsets import ModelViewSet
from back.models import Information, InformationSerializer


class InformationViewSet(ModelViewSet):
    """
    API endpoint that allows information to be viewed or edited.
    """
    queryset = Information.objects.all()
    serializer_class = InformationSerializer
