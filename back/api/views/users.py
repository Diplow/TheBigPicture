from django.contrib.auth.models import Group
from django.conf.settings import AUTH_USER_MODEL
from rest_framework.viewsets import ModelViewSet
from api.serializers.user import UserSerializerWithToken, UserSerializer
from api.serializers.user import GroupSerializer
from api.models import AUTH_USER_MODEL


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AUTH_USER_MODEL.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class AuthViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AUTH_USER_MODEL.objects.all().order_by('-date_joined')
    serializer_class = UserSerializerWithToken


class GroupViewSet(ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

