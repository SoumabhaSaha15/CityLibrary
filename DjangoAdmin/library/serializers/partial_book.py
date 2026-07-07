from ..models import Book
from rest_framework import serializers
from cloudinary.utils import cloudinary_url
from .minimal_author import MinimalAuthorSerializer


class PartialBookSerializer(serializers.ModelSerializer):
    book_cover = serializers.SerializerMethodField()
    authors = MinimalAuthorSerializer(many=True, read_only=True)
    book_genre = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('book_id', 'book_cover', 'book_name',
                  'book_genre', 'authors', 'book_language')

    def get_book_cover(self, object: Book) -> str:
        image_url, _ = cloudinary_url(
            object.book_cover.public_id,
            secure=True,
        )
        return image_url
