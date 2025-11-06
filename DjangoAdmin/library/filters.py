# your_app/filters.py
from .models import (Book, Author)
from django_filters import rest_framework as filters


class AuthorFilter(filters.FilterSet):
    # This creates a case-insensitive search for the author's name
    author_name = filters.CharFilter(
        field_name="author_name", lookup_expr="icontains")
    nationality = filters.CharFilter(
        field_name="nationality", lookup_expr="icontains")
    gender = filters.CharFilter(field_name="gender", lookup_expr="icontains")

    class Meta:
        model = Author
        # List all the fields you want to enable for filtering
        fields = ["author_name", "nationality", "gender"]


class BookFilter(filters.FilterSet):
    book_name = filters.CharFilter(
        field_name='book_name',
        lookup_expr='icontains'
    )
    book_language = filters.CharFilter(
        field_name='book_language',
        lookup_expr='icontains'
    )
    published_on = filters.DateFromToRangeFilter()

    class Meta:
        model = Book
        fields = [
            'book_name',
            'book_genre',
            'book_language',
            'published_on',
            'authors',
            'book_isbn'
        ]
