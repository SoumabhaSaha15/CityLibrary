from django.conf import settings
from rest_framework import serializers
from cloudinary.utils import cloudinary_url
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'profile')

    def get_profile(self, obj):
        default_image_url = settings.DEFAULT_IMAGE_URL
        try:
            if hasattr(obj, 'profile') and obj.profile.user_image and obj.profile.user_image.public_id:
                return cloudinary_url(obj.profile.user_image.public_id, secure=True)[0]
            else:
                return default_image_url
        except Exception:
            return default_image_url
