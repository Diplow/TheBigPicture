from django.contrib.auth.models import Group
from rest_framework.viewsets import ModelViewSet
from api.models import BaseUser
from api.serializers.user import UserSerializerWithToken, UserSerializer, GroupSerializer


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = BaseUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class AuthViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = BaseUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializerWithToken


class GroupViewSet(ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

