from ..models import UserProfile
from django.db import transaction
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
        with transaction.atomic():
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                password=validated_data['password']
            )
            profile = UserProfile.objects.create(
                user=user,
                user_image=profile_image_data
            )
        return user

    def to_representation(self, instance):
        """
        Customize the final JSON output returned to the frontend.
        """
        data = super().to_representation(instance)
        try:
            # Use 'profile' because of your related_name="profile"
            profile = instance.profile
            # Cloudinary automatically provides the full absolute URL
            if profile.user_image:
                data['profile'] = profile.user_image.url
            else:
                data['profile'] = None
        except UserProfile.DoesNotExist:
            data['profile'] = None

        return data
