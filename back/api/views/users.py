from django.contrib.auth.models import Group
from rest_framework.viewsets import ModelViewSet
from api.models import BaseUser, Subscription
from django.http import HttpResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from api.serializers.user import UserSerializerWithToken
from api.serializers.user import UserSerializer
from api.serializers.user import GroupSerializer
from api.serializers.user import SubscriptionSerializer

import json


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = BaseUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class SubscriptionViewSet(ModelViewSet):
    queryset = Subscription.objects.all().order_by('-date')
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return self.request.user.own_subscriptions.all().order_by('-date')

    def create(self, request):
        if request.user.id != int(request.data["author"]):
            return HttpResponse(json.dumps({"error": "Vous ne pouvez abonner que vous-même à un autre utilisateur."}), status=401)
        return super().create(request)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
def unfollow(request, target):
  sub = Subscription.objects.get(author=request.user.id, target=target)
  res = { "id": sub.id }
  sub.delete()
  return HttpResponse(json.dumps(res), status=201)


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

