from api.serializers.user import UserSerializer
from api.models.user import BaseUser


def my_jwt_response_handler(token, user=None, request=None):
  usr = BaseUser.objects.get(id=user.id)
  return {
    'token': token,
    'user': UserSerializer(usr, context={'request': request}).data
  }

def get_or_none(item, kwargs):
  try:
    return item.objects.get(**kwargs)
  except:
    return None
