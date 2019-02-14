from django.contrib.auth.models import User, Group
from rest_framework.serializers import HyperlinkedModelSerializer


class UserSerializer(HyperlinkedModelSerializer):

	class Meta:
		model = User
		fields = ("url", "username", "email", "groups")


class GroupSerializer(HyperlinkedModelSerializer):

	class Meta:
		model = Group
		fields = "__all__"
