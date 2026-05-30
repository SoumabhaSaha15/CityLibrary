from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import login, authenticate
from ..serializers import UserAuthenticateSerializer, UserSerializer


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
