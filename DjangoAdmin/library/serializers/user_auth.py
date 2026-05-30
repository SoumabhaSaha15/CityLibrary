from rest_framework import serializers


class UserAuthenticateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
