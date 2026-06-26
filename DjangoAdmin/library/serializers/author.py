from ..models import Author
from rest_framework import serializers
from cloudinary.utils import cloudinary_url


class AuthorSerializer(serializers.ModelSerializer):
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = "__all__"

    def get_author_image(self, object: Author) -> str:
        image_url, options = cloudinary_url(
            object.author_image.public_id,
            # width=150,
            # height=150,
            # crop="fill",
            secure=True
        )
        return image_url
