from rest_framework import serializers
from . models import Author
from cloudinary import utils
from django.contrib.auth.models import User
from rest_framework.serializers import ImageField
from .models import UserProfile  # <-- 1. Import your UserProfile model

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
        
        # 2. Create the User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        # 3. Manually create the UserProfile, passing in the user and image
        try:
            UserProfile.objects.create(
                user=user, 
                user_image=profile_image_data
            )
        except Exception as e:
            # If profile creation fails, delete the user to avoid orphaned accounts
            user.delete()
            raise e
            
        return user
class AuthorSerializer(serializers.ModelSerializer):
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = "__all__"
        # exclude = ['author_image']

    def get_author_image(self, object: Author) -> str:
        image_url, options = utils.cloudinary_url(
            object.author_image.public_id,
            width=150,
            height=150,
            crop="fill",
            secure=True
        )
        return image_url
