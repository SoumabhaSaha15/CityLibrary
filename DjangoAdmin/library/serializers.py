from rest_framework import serializers
from . models import Author
from cloudinary import utils
from django.contrib.auth.models import User


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Specify fields to be used for user creation
        fields = ('username', 'password', 'email')
        extra_kwargs = {
            # Ensures password is not sent back in response
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Create and return a new user with a hashed password.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            # .get() makes email optional
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
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
