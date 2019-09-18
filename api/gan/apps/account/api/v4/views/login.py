from django.contrib.auth import authenticate, login, logout
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from gan.apps.account.api.v4.serializers import LoginSerializer
from gan.apps.common.authentication import create_token, set_jwt_cookie
from gan.apps.common.permissions import IsNotAuthenticated


class LoginView(CreateAPIView):

    permission_classes = [IsNotAuthenticated]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():
            user = authenticate(email=request.data["email"], password=request.data["password"])

            if user:
                login(request, user)

                # Prepare JWT
                response_data = create_token(request, user)
                response_obj = Response(status=status.HTTP_200_OK, data=response_data)

                response = set_jwt_cookie(response_obj, response_data["token"])
            else:
                response = Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'detail': _('Incorrect email or password.')}
                )
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)

        return response


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('jwt')

        return response
