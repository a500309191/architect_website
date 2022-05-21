from django.urls import path, include
from rest_framework import routers
from . import views
from .views import HouseViewSet, ImageViewSet

# router = routers.SimpleRouter()
# router.register(r'house', HouseViewSet, basename='house')
#basename can be anything
# print(router.urls)

urlpatterns = [
    # path('api/', include(router.urls)), #http://.../api/house,
    path('', views.home, name='home'),
    path('api/houselist/', HouseViewSet.as_view({'get': 'list'})),
    path('api/imagelist/', ImageViewSet.as_view({'get': 'list'})),
]




