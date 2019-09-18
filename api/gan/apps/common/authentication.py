from datetime import datetime

from django.conf import settings
from rest_framework_jwt.settings import api_settings as jwt_api_settings


def custom_jwt_payload_handler(user, request):
    jwt_payload_handler = jwt_api_settings.JWT_PAYLOAD_HANDLER
    payload = jwt_payload_handler(user, request)

    return payload


def set_jwt_cookie(response, token):
    expires = datetime.now() + jwt_api_settings.JWT_EXPIRATION_DELTA

    response.set_cookie(
        key="jwt",
        value=token,
        domain=settings.SESSION_COOKIE_DOMAIN,
        expires=expires,
    )

    return response


def create_token(request, user):
    jwt_payload_handler = jwt_api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = jwt_api_settings.JWT_ENCODE_HANDLER
    jwt_response_payload_handler = jwt_api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)
    response_data = jwt_response_payload_handler(token, user, request)

    return response_data
