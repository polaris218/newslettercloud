from django.core.validators import EmailValidator


def custom_email_validator(value):
    validator = EmailValidator()
    return validator(value)
