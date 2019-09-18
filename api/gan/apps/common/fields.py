from django.db import models

from gan.apps.common.validators import custom_email_validator


class CustomEmailField(models.EmailField):

    default_validators = [custom_email_validator]
