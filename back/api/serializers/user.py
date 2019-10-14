from django.contrib.auth.models import Group
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField, CharField, ImageField
from rest_framework_jwt.settings import api_settings
from api.models import BaseUser


class UserSerializer(ModelSerializer):
    image = ImageField()

    class Meta:
        model = BaseUser
        fields = ("id", "username", "groups", "image")


class GroupSerializer(ModelSerializer):

	class Meta:
		model = Group
		fields = "__all__"


class UserSerializerWithToken(ModelSerializer):
    token = SerializerMethodField()
    password = CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = BaseUser
        fields = ('token', 'username', 'password', 'image', 'id')
