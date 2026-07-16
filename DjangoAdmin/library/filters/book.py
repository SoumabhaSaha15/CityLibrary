from ..models import Book
import django_filters as filters


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

    author_name = filters.CharFilter(
        # Adjust based on your actual Author model field
        field_name='authors__author_name',
        lookup_expr='icontains'
    )
    genre_name = filters.CharFilter(
        field_name='book_genre__genre_name',
        lookup_expr='icontains'
    )
    book_isbn = filters.CharFilter(
        field_name='book_isbn',
        lookup_expr='icontains'
    )

    class Meta:
        model = Book
        fields = [
            'book_name',
            # 'book_genre',
            'book_language',
            'published_on',
            # 'authors',
            'book_isbn'
        ]
