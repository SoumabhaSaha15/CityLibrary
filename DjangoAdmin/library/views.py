# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import AuthorSerializer
from .models import Author

class AuthorView(APIView):
    def get(self, _request: Request):
        authors = Author.objects.all()
        try:
            serialized = AuthorSerializer(authors, many=True)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({'error': err.__class__.__name__}, status=500)

    def get(self, _request: Request, pk: int):
        authors = Author.objects.get(pk=pk)
        try:
            serialized = AuthorSerializer(authors)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({'error': err.__class__.__name__}, status=500)
