from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import AuthorSerializer, UserCreateSerializer,UserAuthenticateSerializer,UserSerializer
from .models import Author
# from .serializers import UserSerializer

class UserLoginView(APIView):
    """
    Handles user login and session creation.
    """
    # Allow any user (even unauthenticated ones) to access this view.
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        serializer = UserAuthenticateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        if not username or not password:
            return Response(
                {'error': 'Please provide both username and password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = authenticate(username=username, password=password)
        if user is not None:
            # 2. Credentials are valid, so create a session (log the user in)
            login(request, user)

            # 3. Send back the user's data
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # 4. Credentials are invalid
            return Response(
                {'error': 'Invalid Credentials'},
                status=status.HTTP_401_UNAUTHORIZED
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
