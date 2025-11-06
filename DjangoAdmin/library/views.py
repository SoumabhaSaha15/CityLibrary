from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.request import Request
from django.http import HttpRequest
from django.contrib.auth.models import AbstractUser
from .serializers import (
    AuthorSerializer,
    UserCreateSerializer,
    UserAuthenticateSerializer,
    UserSerializer,
    BookSerializer
)
from django_filters.rest_framework import DjangoFilterBackend
from .filters import (AuthorFilter, BookFilter)
from .models import (Author, Book)

# from .serializers import UserSerializer


class UserLogoutView(APIView):
    """
    Handles user logout and session termination.
    """

    def get(self, request: Request):
        logout(request._request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserLoginView(APIView):
    """
    Handles user login and session creation.
    """

    # Allow any user (even unauthenticated ones) to access this view.
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def post(self, request: Request):
        serializer = UserAuthenticateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get("username")  # type: ignore
        password = serializer.validated_data.get("password")  # type: ignore
        if not username or not password:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(username=username, password=password)
        if user is not None:
            # 2. Credentials are valid, so create a session (log the user in)
            login(request, user)  # type: ignore

            # 3. Send back the user's data
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # 4. Credentials are invalid
            return Response(
                {"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


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


class AuthorPaginator(ListAPIView):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = AuthorFilter


class AuthorDetailView(APIView):
    def get(self, _request: Request, pk: int):
        author = Author.objects.get(pk=pk)
        try:
            serialized = AuthorSerializer(author)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({"error": err.__class__.__name__}, status=500)


class BookDetailView(APIView):
    def get(self, _request: Request, pk: int):
        book = Book.objects.get(pk=pk)
        try:
            serialized = BookSerializer(book)
            return Response(serialized.data)
        except Exception as err:
            print(err.__traceback__)
            return Response({"error": err.__class__.__name__}, status=500)


class BookPaginator(ListAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter
