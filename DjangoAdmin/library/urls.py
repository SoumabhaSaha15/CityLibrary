from django.urls import path
from .views import *


urlpatterns = [
    path('authors', AuthorPaginator.as_view()),
    path('authors/<int:pk>', AuthorDetailView.as_view()),
    path('books', BookPaginator.as_view()),
    path('books/<int:pk>', BookDetailView.as_view()),
    path('borrows', BorrowListCreateView.as_view()),
    path('borrows/<uuid:pk>', BorrowDetailView.as_view()),
    path('user/signup', UserSignupView.as_view()),
    path('user/login', UserLoginView.as_view()),
    path('user/logout', UserLogoutView.as_view())
]
