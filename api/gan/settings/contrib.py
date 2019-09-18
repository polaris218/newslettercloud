import datetime

from celery.schedules import crontab  # noqa

from .django import TIME_ZONE as DJANGO_TIME_ZONE
from .environment import env  # noqa


CELERY_TASK_ALWAYS_EAGER = env.bool("GAN_CELERY_TASK_ALWAYS_EAGER", default=False)
CELERY_BROKER_URL = env.str("GAN_CELERY_BROKER", default="redis://redis:6379/1")
CELERY_RESULT_BACKEND = env.str("GAN_CELERY_RESULT_BACKEND", default="rpc://")

MAIL_CELERY_TASK_ALWAYS_EAGER = env.bool("GAN_MAIL_CELERY_TASK_ALWAYS_EAGER", default=False)
MAIL_CELERY_BROKER_URL = env.str("GAN_MAIL_CELERY_BROKER", default="redis://redis:6379/2")
MAIL_CELERY_RESULT_BACKEND = env.str("GAN_MAIL_CELERY_RESULT_BACKEND", default="rpc://")

CELERY_ACCEPT_CONTENT = MAIL_CELERY_ACCEPT_CONTENT = ["application/json"]
CELERY_TASK_SERIALIZER = CELERY_RESULT_SERIALIZER = MAIL_CELERY_TASK_SERIALIZER = MAIL_CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = MAIL_CELERY_TIMEZONE = DJANGO_TIME_ZONE

CELERYBEAT_SCHEDULE = {}

MAIL_CELERYBEAT_SCHEDULE = {}


REST_FRAMEWORK = {"DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_jwt.authentication.JSONWebTokenAuthentication",)}


JWT_AUTH = {
    "JWT_AUTH_COOKIE": "jwt",
    "JWT_EXPIRATION_DELTA": datetime.timedelta(seconds=env.int("GAN_JWT_EXPIRATION_DELTA", default=300)),
    "JWT_ALLOW_REFRESH": True,
}
