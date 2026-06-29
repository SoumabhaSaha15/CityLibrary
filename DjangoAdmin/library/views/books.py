from ..models import Book
from ..filters import BookFilter
from ..pagination import CustomPagination
from ..permissions import IsLibraryMembersGroup
from rest_framework.generics import ListAPIView
from ..serializers import PartialBookSerializer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend


class BookPaginator(ListAPIView):
    permission_classes = [IsLibraryMembersGroup]
    serializer_class = PartialBookSerializer
    queryset = Book.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter
    pagination_class = CustomPagination
