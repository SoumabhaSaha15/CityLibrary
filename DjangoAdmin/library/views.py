# from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import AuthorSerializer, UserCreateSerializer
from .models import Author


class UserSignupView(APIView):
    """
    Handles user registration.
    - Accepts POST requests with username, email, and password.
    - On success, creates the user and establishes a session.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
