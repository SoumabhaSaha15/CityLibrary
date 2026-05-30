from django.urls import path
from .views import (
    AuthorDetailView,
    AuthorPaginator,
    BookDetailView,
    BookPaginator,
    UserSignupView,
    UserLoginView,
    UserLogoutView
)
urlpatterns = [
    path('authors', AuthorPaginator.as_view()),
    path('authors/<int:pk>', AuthorDetailView.as_view()),
    path('books', BookPaginator.as_view()),
    path('books/<int:pk>', BookDetailView.as_view()),
    path('user/signup', UserSignupView.as_view()),
    path('user/login', UserLoginView.as_view()),
    path('user/logout', UserLogoutView.as_view())
]
