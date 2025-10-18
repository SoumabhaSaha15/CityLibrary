from rest_framework import serializers
from . models import Author
import cloudinary


class AuthorSerializer(serializers.ModelSerializer):
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = "__all__"
        # exclude = ['author_image']

    def get_author_image(self, object):
        image_url, options = cloudinary.utils.cloudinary_url(
            object.author_image.public_id,
            width=150,
            height=150,
            crop="fill",
            secure=True
        )
        return image_url
