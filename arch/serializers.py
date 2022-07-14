from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import *


def getFKFieldsValues(*models):
    FKValuesDict = {}
    for model in models:
        valuesDict = {}
        querySet = model.objects.all()
        for instance in querySet:
            valuesDict.setdefault(instance.id, instance.name.lower())
        FKValuesDict.setdefault(querySet.model.__name__.lower(), valuesDict)
        valuesDict = {}

    return FKValuesDict

FKFieldsValues = getFKFieldsValues(Roof, Material, Style)


def getFKModelsValues(model, value=False):
    d = {}
    instances = model.objects.all()
    for instance in instances:
        if value == False:
            d.setdefault(instance.house_id, []).append(str(instance))
        else:
            d.setdefault(instance.house_id, []).append(str(getattr(instance, value)))

    return d

imagesDict = getFKModelsValues(Image)
imageThumbnailsDict = getFKModelsValues(Image, "image_thumbnail")
plansDict = getFKModelsValues(Plan)


class HouseSerializer(serializers.ModelSerializer):

    images = serializers.SerializerMethodField("get_house_images")
    def get_house_images(self, house):
        return imagesDict[house.id]

    image_thumbnails = serializers.SerializerMethodField("get_house_image_thumbnails")
    def get_house_image_thumbnails(self, house):
        return imageThumbnailsDict[house.id]

    plans = serializers.SerializerMethodField("get_house_plans")
    def get_house_plans(self, house):
        return plansDict[house.id]

    class Meta:
        model = House
        exclude = ["time_create", "time_update"]
        # depth = 1

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["roof"] = FKFieldsValues["roof"][data["roof"]]
        data["material"] = FKFieldsValues["material"][data["material"]]
        data["style"] = FKFieldsValues["style"][data["style"]]

        return data





#old houseSerializer - WORK SLOWLY
# class HouseSerializer(serializers.ModelSerializer):
#     images = serializers.SerializerMethodField("get_house_images")
#     def get_house_images(self, house):
#         images = Image.objects.filter(house_id=house.id)
#         return [str(image) for image in images]
#
#     image_thumbnails = serializers.SerializerMethodField("get_house_image_thumbnails")
#     def get_house_image_thumbnails(self, house):
#         return [str(thumbnail.image_thumbnail) for thumbnail in Image.objects.filter(house_id=house.id)]
#
#     plans = serializers.SerializerMethodField("get_house_plans")
#     def get_house_plans(self, house):
#         return [str(plan.plan) for plan in Plan.objects.filter(house_id=house.id)]
#
#     class Meta:
#         model = HousePage
#         exclude = ["time_create", "time_update"]
#
#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#
#         roof = Roof.objects.get(id=data["roof"])
#         data["roof"] = roof.name.lower()
#
#         material = Material.objects.get(id=data["material"])
#         data["material"] = material.name.lower()
#
#         style = Style.objects.get(id=data["style"])
#         data["style"] = style.name.lower()
#
#         return data


# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = ["house", "image"]


