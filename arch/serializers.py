from rest_framework import serializers
from arch.models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = 'original', 'thumbnail',

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = 'plan',
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data = data["plan"]
        return data


class HouseSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)
    plans = PlanSerializer(many=True, read_only=True)

    material = serializers.CharField(source='material.name', read_only=True)
    roof = serializers.CharField(source='roof.name', read_only=True)
    style = serializers.CharField(source='style.name', read_only=True)

    class Meta:
        model = House
        exclude = ["time_create", "time_update"]
        # depth = 1




"""
custom test serializer
Idea is to get data from dicts.
It works FASTER THAN SERIALIZER ABOVE,
but I dont understand how to update variables
(representationDict, imageDict, imageThumbnailsDict, plansDict)
when data changes
"""
# class HouseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = House
#         exclude = ["time_create", "time_update"]
#         # depth = 1
#
#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#
#         data["roof"] = representationDict["roof"][data["roof"]]
#         data["material"] = representationDict["material"][data["material"]]
#         data["style"] = representationDict["style"][data["style"]]
#         data["images"] = imageDict[instance.id]
#         data["thumbnails"] = imageThumbnailsDict[instance.id]
#         data["plans"] = plansDict[instance.id]
#
#         return data

# def toRepresentationDict(*models):
#     representationDict = {}
#     for model in models:
#         valuesDict = {}
#         querySet = model.objects.all()
#         for instance in querySet:
#             valuesDict.setdefault(instance.id, instance.name.lower())
#         representationDict.setdefault(querySet.model.__name__.lower(), valuesDict)
#     return representationDict
#
#
# def getFKModelsValues(model, value=False):
#     d = {}
#     instances = model.objects.all()
#     for instance in instances:
#         if value == False:
#             d.setdefault(instance.house_id, []).append(str(instance))
#         else:
#             d.setdefault(instance.house_id, []).append(str(getattr(instance, value)))
#     return d
#
#
#
# representationDict = toRepresentationDict(Roof, Material, Style)
# imagesDict = getFKModelsValues(Image)
# imageThumbnailsDict = getFKModelsValues(Image, "image_thumbnail")
# plansDict = getFKModelsValues(Plan)