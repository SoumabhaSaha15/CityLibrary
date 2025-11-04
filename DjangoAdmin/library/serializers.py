from cloudinary.utils import cloudinary_url
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ImageField
from django.conf import settings
from .models import Author, UserProfile, Book


class UserAuthenticateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


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


class AuthorSerializer(serializers.ModelSerializer):
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = "__all__"

    def get_author_image(self, object: Author) -> str:
        image_url, options = cloudinary_url(
            object.author_image.public_id,
            width=150,
            height=150,
            crop="fill",
            secure=True
        )
        return image_url


class BookSerializer(serializers.ModelSerializer):
    book_cover = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_book_cover(self, object: Book) -> str:
        image_url, _ = cloudinary_url(
            object.book_cover.public_id,
            width=150,
            height=150,
            crop="fill",
            secure=True
        )
        return image_url
