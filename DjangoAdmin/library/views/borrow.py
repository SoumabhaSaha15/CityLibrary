from ..models import Borrow
from ..serializers import BorrowSerializer
from ..permissions import IsLibraryMembersGroup
# from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView


class BorrowListCreateView(ListCreateAPIView):
    permission_classes = [IsLibraryMembersGroup]
    serializer_class = BorrowSerializer

    def get_queryset(self):
        """Restricts queryset to only return borrows belonging to the authenticated user."""
        return Borrow.objects.filter(user=self.request.user).select_related(
            "requested_book", "book_copy"
        )
