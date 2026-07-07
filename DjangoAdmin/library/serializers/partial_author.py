from ..models import Author
from rest_framework import serializers
from cloudinary.utils import cloudinary_url


class PartialAuthorSerializer(serializers.ModelSerializer):
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ('author_id', 'author_image', 'author_name',
                  'nationality')

    def get_author_image(self, object: Author) -> str:
        image_url, _ = cloudinary_url(
            object.author_image.public_id,
            secure=True,
        )
        return image_url
