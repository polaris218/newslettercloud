from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField

from gan.apps.common.fields import CustomEmailField
from gan.apps.common.models import CoreModel


class Address(CoreModel):

    org_number = models.CharField(_("organization no."), max_length=25, blank=True)
    vat_id = models.CharField(_("VAT id"), max_length=25, blank=True)
    phone = models.CharField(_("phone"), max_length=25, blank=True)
    reference = models.CharField(_("reference"), max_length=100, blank=True)
    address_1 = models.CharField(_("address"), max_length=60, blank=True)
    address_2 = models.CharField(_("address 2"), max_length=60, blank=True)
    city = models.CharField(_("city"), max_length=40, blank=True)
    zip_code = models.CharField(_("zip-code"), max_length=10, blank=True)
    state = models.CharField(_("state"), max_length=2, blank=True)
    country = CountryField(_("country"))
    email = CustomEmailField(_("email"), blank=True)
    extra_email = CustomEmailField(_("extra email"), blank=True)
    extra_phone = models.CharField(_("extra phone"), max_length=25, blank=True)

    class Meta:

        verbose_name = _("address")
        verbose_name_plural = _("addresses")

    def __str__(self):
        return f"{self.country} {self.address_1}"
