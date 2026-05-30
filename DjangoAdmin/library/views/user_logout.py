from rest_framework import status
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response


class UserLogoutView(APIView):
    """
    Handles user logout and session termination.
    """

    def get(self, request: Request):
        logout(request._request)
        return Response(status=status.HTTP_204_NO_CONTENT)
