from django.contrib.auth import login
from django.db import transaction
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from gan.apps.account.api.v4.serializers import SignupSerializer
from gan.apps.account.utils import send_confirmation_email
from gan.apps.common.authentication import create_token, set_jwt_cookie
from gan.apps.common.permissions import IsNotAuthenticated


class SignupView(CreateAPIView):

    serializer_class = SignupSerializer
    permission_classes = [IsNotAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()
                login(request, user)

                # Prepare JWT
                response_data = create_token(request, user)

                response = set_jwt_cookie(
                    response=Response(status=status.HTTP_201_CREATED, data=response_data),
                    token=response_data["token"]
                )
        else:
            response = Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)

        return response


class ResendConfirm(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        # TODO expand during implementation of Notification
        send_confirmation_email(request.user)
        return Response(status=status.HTTP_201_CREATED)
