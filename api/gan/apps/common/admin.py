from django.contrib import admin

from gan.apps.common.models import Currency


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):

    list_display = ("code",)
    fields = ("code", "name", "is_active")
    ordering = ("code",)
