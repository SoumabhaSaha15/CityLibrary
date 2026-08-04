from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView, RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin', RedirectView.as_view(url='/admin/', permanent=True)),
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
    # path('', include('library.urls')),  # on dev server
    path('api/', include('library.urls')),
    re_path(
        r"^.*$",
        TemplateView.as_view(template_name="index.html"),
        name="frontend"
    ),  # for production
]
