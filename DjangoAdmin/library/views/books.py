from ..models import Book
from ..filters import BookFilter
from ..serializers import BookSerializer
from ..pagination import CustomPagination
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend


class BookPaginator(ListAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter
    pagination_class = CustomPagination
