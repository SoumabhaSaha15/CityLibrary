from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from ..serializers import UserCreateSerializer
from rest_framework import status, permissions


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
        user: AbstractUser = serializer.save()  # type: ignore
        login(request._request, user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
