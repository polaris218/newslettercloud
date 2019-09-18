from django.db import models
from django.utils.translation import gettext_lazy as _

from gan.apps.common.models import CoreModel


class Currency(CoreModel):

    code = models.CharField(_("code"), max_length=3)
    name = models.CharField(_("name"), max_length=255)

    class Meta:

        verbose_name = _("currency")
        verbose_name_plural = _("currencies")

    def __str__(self):
        return self.code
