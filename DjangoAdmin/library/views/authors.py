from ..models import Author
from ..filters import AuthorFilter
from ..pagination import CustomPagination
from ..serializers import PartialAuthorSerializer
from ..permissions import IsLibraryMembersGroup
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend


class AuthorPaginator(ListAPIView):
    permission_classes = [IsLibraryMembersGroup]
    serializer_class = PartialAuthorSerializer
    queryset = Author.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = AuthorFilter
    pagination_class = CustomPagination
