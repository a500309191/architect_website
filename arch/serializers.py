from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import House, Image, Material, Style

class HouseSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("_get_house_images")
    def _get_house_images(self, house):
        images_list = []
        house_images = Image.objects.filter(house_id=house.id)
        for image in house_images:
            image = str(image.image)
            images_list.append(image)
        return images_list

    class Meta:
        model = House
        exclude = ["time_create", "time_update"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["size"] = instance.sizes_choice[instance.size-1][1]
        data["roof"] = instance.roofs_choice[instance.roof-1][1]

        material = Material.objects.get(id=data["material"])
        data["material"] = material.name

        style = Style.objects.get(id=data["style"])
        data["style"] = style.name

        return data

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["house", "image"]


