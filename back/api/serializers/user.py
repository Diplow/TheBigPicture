from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from api.models import BigPicture, Rating, BaseUser, Subscription


class UserSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = BaseUser
        fields = ("id", "username", "groups", "image", "bio")


class SubscriptionSerializer(serializers.ModelSerializer):
    target = UserSerializer(read_only=True)
    target_id = serializers.PrimaryKeyRelatedField(source='target',  queryset=BaseUser.objects.all(), )

    class Meta:
        model = Subscription
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = "__all__"


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

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
