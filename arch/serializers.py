from rest_framework import serializers
from .models import House, Image

class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['house', 'image']
