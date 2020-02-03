from api.serializers.user import UserSerializer
from api.settings import AUTH_USER_MODEL


def my_jwt_response_handler(token, user=None, request=None):
	usr = AUTH_USER_MODEL.objects.get(id=user.id)
	return {
		'token': token,
		'user': UserSerializer(usr, context={'request': request}).data
	}
