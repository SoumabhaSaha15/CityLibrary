from django.urls import path
from . import views
urlpatterns = [
  path('authors',views.AuthorView.as_view()),
  path('authors/<int:pk>',views.AuthorView.as_view()),
  path('user/signup',views.UserSignupView.as_view()),
  path('user/login',views.UserLoginView.as_view()),
  path('user/logout',views.UserLogoutView.as_view())
]