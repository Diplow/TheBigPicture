from django.contrib.auth.models import User, Group
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField, CharField
from rest_framework_jwt.settings import api_settings


class UserSerializer(ModelSerializer):

	class Meta:
		model = User
		fields = ("id", "url", "username", "email", "groups")


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
        model = User
        fields = ('token', 'username', 'password')
