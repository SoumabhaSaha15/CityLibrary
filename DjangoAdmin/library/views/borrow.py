from ..models import Borrow
from rest_framework import status
from ..pagination import CustomPagination
from rest_framework.response import Response
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
        return (Borrow.objects
                .filter(user=self.request.user)
                .select_related("requested_book", "book_copy")
                .order_by("-requested_at", "borrow_id"))

    def create(self, request, *args, **kwargs):
        # 1. Validate incoming data using full BorrowSerializer (processes return_date, book ID, etc.)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # 2. Save the instance to the database
        instance = serializer.save(user=request.user)

        # 3. Return ONLY the borrow_id in the HTTP 201 response payload
        return Response({"borrow_id": instance.borrow_id}, status=status.HTTP_201_CREATED)
