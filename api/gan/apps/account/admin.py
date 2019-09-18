from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy

from gan.apps.account.models import Address, Organization

from . import forms, models


@admin.register(models.User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {"fields": ("password",)}),
        (gettext_lazy("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            gettext_lazy("Permissions"),
            {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")},
        ),
        (gettext_lazy("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),)
    list_display = ("email", "first_name", "last_name", "is_staff")
    search_fields = ("first_name", "last_name", "email")
    ordering = ("email",)
    form = forms.AdminUserChangeForm


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):

    list_display = ("name", "user", "address")
    fields = ("name", "user", "address", "invoice_address", "different_billing_address", "invoice_email", "currency")
    ordering = ("name",)
    search_fields = ("name",)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):

    list_display = ("country", "org_number")
    ordering = ("country",)
    search_fields = ("country", "org_number", "address_1", "city")
