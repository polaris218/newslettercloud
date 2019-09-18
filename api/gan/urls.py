from django.conf import settings
from django.contrib import admin
from django.urls import include, path


API_URL_PREFIX = "new_api"

urlpatterns = [
    path("admin/", admin.site.urls),
    # API V3
    path(f"{API_URL_PREFIX}/v3/", include("gan.apps.account.api.v3.urls")),
    # API V4
    path(f"{API_URL_PREFIX}/v4/", include("gan.apps.account.api.v4.urls")),
]


# enable serve static by django for local development
if settings.DEBUG:  # noqa
    from django.conf.urls.static import static

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


# enable debug_toolbar for local development (if installed)
if settings.DEBUG and "debug_toolbar" in settings.INSTALLED_APPS:
    import debug_toolbar

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
