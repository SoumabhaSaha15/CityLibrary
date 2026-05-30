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