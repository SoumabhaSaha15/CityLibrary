from django.urls import path
from . import views
urlpatterns = [
    path('authors', views.AuthorPaginator.as_view()),
    path('authors/<int:pk>', views.AuthorDetailView.as_view()),
    path('books/', views.BookPaginator.as_view()),
    path('user/signup', views.UserSignupView.as_view()),
    path('user/login', views.UserLoginView.as_view()),
    path('user/logout', views.UserLogoutView.as_view())
]
