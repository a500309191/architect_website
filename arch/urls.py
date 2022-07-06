from django.urls import path, include
from rest_framework import routers
from . import views
from .views import HouseViewSet

router = routers.SimpleRouter()
router.register(r"house", HouseViewSet, basename="house")
# router.register(r'image', ImageViewSet, basename='image')
# print(router.urls)

urlpatterns = [
    path("api/", include(router.urls)),
    path("custom_serializer/", views.custom_serializer, name="home"),
    # path('api/houselist/', HouseViewSet.as_view({'get': 'list'})),
    # path('api/houselist/<int:pk>/', HouseViewSet.as_view({'get': 'list'})),
    # path('api/imagelist/', ImageViewSet.as_view({'get': 'list'})),
    # path('api/imagelist/<int:pk>/', ImageViewSet.as_view({'get': 'list'})),
]




