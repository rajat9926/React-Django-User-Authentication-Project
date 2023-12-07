from django.urls import path
from account.views import UserRegistrationView,UserLoginView,UserProfileView,UserPasswordChangeView,SendPasswordResetEmailView,PasswordResetView



urlpatterns = [
	path('register/',UserRegistrationView.as_view(),name='registration'),
	path('login/',UserLoginView.as_view(),name='login'),
	path('profile/',UserProfileView.as_view(),name='profile'),
	path('changepassword/',UserPasswordChangeView.as_view(),name='passwordchange'),
	path('sendemailresetpassword/',SendPasswordResetEmailView.as_view(),name='sendemailresetpassword'),
	path('resetpassword/<uid>/<token>/',PasswordResetView.as_view(),name='resetpassword')
]
