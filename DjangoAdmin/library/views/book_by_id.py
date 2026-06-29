from ..models import Book
from ..serializers import BookSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class BookDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, _request: Request, pk: int):
        book = Book.objects.get(pk=pk)
        try:
            serialized = BookSerializer(book)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({"error": err.__class__.__name__}, status=500)
