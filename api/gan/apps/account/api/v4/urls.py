from django.urls import path

from gan.apps.account.api.v4.views import LoginView, LogoutView, ResendConfirm, SignupView


urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("signup/resend_confirm/", ResendConfirm.as_view(), name="resend-confirm"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
