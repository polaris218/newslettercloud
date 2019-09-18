from django.db import models
from django.utils.translation import gettext_lazy as _

from gan.apps.account.models import Address, User
from gan.apps.common.fields import CustomEmailField
from gan.apps.common.models import CoreModel, Currency


class Organization(CoreModel):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(_("name"), max_length=100, blank=True)
    address = models.ForeignKey(Address, related_name="+", on_delete=models.CASCADE)
    invoice_address = models.ForeignKey(Address, related_name="+", on_delete=models.CASCADE)
    different_billing_address = models.BooleanField(_("different billing address"), default=False)
    invoice_email = CustomEmailField(_("invoice email"))
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
