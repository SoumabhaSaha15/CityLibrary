from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Book
from ..permissions import IsLibraryMembersGroup


class BookCoverDetailView(APIView):
    permission_classes = [IsLibraryMembersGroup]

    def get(self, request, pk):
        """Returns the Cloudinary image URL for the requested book cover."""
        book = get_object_or_404(Book, pk=pk)

        if not book.book_cover:
            return Response(
                {"detail": "No cover image available for this book."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Cloudinary automatically returns the full secure URL via .url
        return Response(
            {"book_cover": book.book_cover.url},
            status=status.HTTP_200_OK,
        )
