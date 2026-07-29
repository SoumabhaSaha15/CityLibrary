from ..models import Borrow
from ..pagination import CustomPagination
from ..permissions import IsLibraryMembersGroup
from rest_framework.generics import ListCreateAPIView
from ..serializers import BorrowSerializer, PartialBorrowSerializer


class BorrowListCreateView(ListCreateAPIView):
    permission_classes = [IsLibraryMembersGroup]
    pagination_class = CustomPagination

    def get_serializer_class(self):
        """
        Returns PartialBorrowSerializer for paginated GET requests,
        and the regular BorrowSerializer for POST creation requests.
        """
        if self.request.method == "GET":
            return PartialBorrowSerializer
        return BorrowSerializer

    def get_queryset(self):
        """Restricts queryset to only return borrows belonging to the authenticated user."""
        return Borrow.objects.filter(user=self.request.user).select_related(
            "requested_book", "book_copy"
        )
