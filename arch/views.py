from arch.serializers import *
from .models import *
from rest_framework import viewsets


class HouseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = House.objects.prefetch_related('roof', 'material', 'style', 'images', 'plans')
    serializer_class = HouseSerializer
    lookup_field = 'model_name'

# class ImageViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Image.objects.prefetch_related('original', 'thumbnail')
#     serializer_class = ImageSerializer
#
# class PlanViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Plan.objects.prefetch_related('plan')
#     serializer_class = PlanSerializer