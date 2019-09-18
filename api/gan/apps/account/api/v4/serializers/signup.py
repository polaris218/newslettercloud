from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from gan.apps.account.models import User
from gan.apps.account.utils import send_confirmation_email


class SignupSerializer(serializers.Serializer):

    email = serializers.CharField(write_only=True)
    password = serializers.CharField(max_length=128, style={'input_type': 'password'}, write_only=True)

    def validate_password(self, password):
        try:
            validate_password(password)
        except DjangoValidationError as e:
            raise ValidationError(e)
        return password

    def create(self, validated_data):
        try:
            user = User.objects.create_user(email=validated_data["email"], password=validated_data["password"])
        except IntegrityError:
            raise ValidationError({"email": _("A user with this email already exists")})
        else:
            send_confirmation_email(user)
            return user
