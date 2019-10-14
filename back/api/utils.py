from api.serializers.user import UserSerializer
from api.models import BaseUser as User


def my_jwt_response_handler(token, user=None, request=None):
	usr = User.objects.get(id=user.id)
	return {
		'token': token,
		'user': UserSerializer(usr, context={'request': request}).data
	}
