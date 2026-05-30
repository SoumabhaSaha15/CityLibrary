from ..models import UserProfile
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import ImageField


class UserCreateSerializer(serializers.ModelSerializer):
    profile = ImageField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'profile')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Create a new user AND their profile.
        """
        profile_image_data = validated_data.pop('profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        try:
            UserProfile.objects.create(
                user=user,
                user_image=profile_image_data
            )
        except Exception as e:
            user.delete()
            raise e
        return user
