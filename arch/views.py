from django.http import HttpResponseNotFound
from django.shortcuts import render, HttpResponse
from .serializers import *
from .models import House, Image
from rest_framework.response import Response
from rest_framework import viewsets

class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

def home(request):
	return HttpResponse("Bye World")

def pageNotFound(request, exception):
    return HttpResponseNotFound('<h1>404</h1>')