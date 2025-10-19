from rest_framework import serializers
from . models import Author
from cloudinary import utils
from cloudinary.models import CloudinaryField


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
