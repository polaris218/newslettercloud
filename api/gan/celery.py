import os

from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gan.settings")

celery_app = Celery("gan")
celery_app.config_from_object("django.conf:settings", namespace="CELERY")
celery_app.autodiscover_tasks()

mail_celery_app = Celery("mail")
mail_celery_app.config_from_object("django.conf:settings", namespace="MAIL_CELERY")
mail_celery_app.autodiscover_tasks()
