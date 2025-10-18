# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AuthorSerializer
from .models import Author
class AuthorView(APIView):
  def get(self,request):
    authors = Author.objects.all()
    try:
      serialized = AuthorSerializer(authors,many=True)
      return Response(serialized.data)
    except Exception as err:
      print(err)
      return Response(err)