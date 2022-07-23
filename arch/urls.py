from django.urls import path, include
from rest_framework import routers
from . import views
# from .views import HouseViewSet, ImageViewSet
from .views import HouseViewSet

router = routers.DefaultRouter()
router.register(r"houses", HouseViewSet, basename="house")
# router.register(r"images", ImageViewSet, basename="image")

urlpatterns = [
    path("api/", include(router.urls)),
]




