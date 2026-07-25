from ..models import Borrow
from ..serializers import BorrowSerializer
from ..permissions import IsLibraryMembersGroup
from rest_framework.generics import RetrieveAPIView


class BorrowDetailView(RetrieveAPIView):
    permission_classes = [IsLibraryMembersGroup]
    serializer_class = BorrowSerializer

    def get_queryset(self):
        return Borrow.objects.filter(user=self.request.user).select_related(
            "requested_book", "book_copy"
        )
