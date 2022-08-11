from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('__debug__/', include('debug_toolbar.urls')),
    path('arch/', include('arch.urls')),
    path('admin/', admin.site.urls),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    # match the root
    re_path(r'^$', TemplateView.as_view(template_name='index.html')),
    # match all other pages
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]
