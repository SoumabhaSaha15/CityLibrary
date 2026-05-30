from ..models import Author
from ..serializers import AuthorSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response


class AuthorDetailView(APIView):
    def get(self, _request: Request, pk: int):
        author = Author.objects.get(pk=pk)
        try:
            serialized = AuthorSerializer(author)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({"error": err.__class__.__name__}, status=500)
