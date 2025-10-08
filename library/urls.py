from django.urls import path
from . import views
urlpatterns = [
  path('',views.home),
#   path('home',views.home),
#   path('add-book',views.add_book),
#   path('add-client',views.add_client),
#   path('add-admin',views.add_admin),
#   path('search-book',views.search_book),
#   path('borrow-book',views.borrow_book),
#   path('auth-admin',views.auth_admin),
#   path('admin-pannel',views.admin_pannel),
#   path('return-book',views.return_book),
#   path('client-page',views.client_page),
#   path('admin-page',views.admin_page),
#   path('fine-submit',views.fine_submit)
]
