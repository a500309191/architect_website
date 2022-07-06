from django.http import HttpResponseNotFound
from django.shortcuts import render, HttpResponse
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
import json


class HouseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

# class ImageViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Image.objects.all()
#     serializer_class = ImageSerializer

# class HouseViewSet(viewsets.ModelViewSet):
#     queryset = House.objects.all()
#     serializer_class = HouseSerializer
#
# class ImageViewSet(viewsets.ModelViewSet):
#     queryset = Image.objects.all()
#     serializer_class = ImageSerializer

def home(request):
	return HttpResponse("Bye World")

def pageNotFound(request, exception):
    return HttpResponseNotFound('<h1>404</h1>')

def custom_serializer(request):
    houses = House.objects.all()
    images = Image.objects.all()
    plans = Plan.objects.all()

    houseFieldsList = [str(field).split('.')[-1] for field in houses[0]._meta.get_fields() if str(field).split('.')[-2] == 'House']

    l = []
    for house in houses:
        d = {}
        for field in houseFieldsList:
            value = getattr(house, field)
            d.setdefault(field, value)

        images = [image.image for image in Image.objects.filter(house_id=house.id)]
        d.setdefault('images', images)

        image_thumbnails = [image.image_thumbnail for image in Image.objects.filter(house_id=house.id)]
        d.setdefault('images_thumbnails', image_thumbnails)

        plans = [plan.plan for plan in Plan.objects.filter(house_id=house.id)]
        d.setdefault('plans', plans)

        l.append(d)

    #return HttpResponse("\n".join([command for command in dir(x)]))
    #return HttpResponse("\n".join([str(field) for field in houses[21]._meta.get_fields()]))
    return HttpResponse(l)