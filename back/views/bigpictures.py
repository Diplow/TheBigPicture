from rest_framework.viewsets import ModelViewSet
from back.models import BigPicture, BigPictureSerializer


class BigPictureViewSet(ModelViewSet):
    """
    API endpoint that allows bigpictures to be viewed or edited.
    """
    queryset = BigPicture.objects.all()
    serializer_class = BigPictureSerializer
