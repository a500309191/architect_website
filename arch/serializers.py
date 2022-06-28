from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import House, Image, Drawing, Material, Style

class HouseSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("get_house_images")
    def get_house_images(self, house):
        images_list = []
        house_images = Image.objects.filter(house_id=house.id)
        for image in house_images:
            image = str(image.image)
            images_list.append(image)
        return images_list

    thumbnails = serializers.SerializerMethodField("get_house_thumbnails")
    def get_house_thumbnails(self, house):
        thumbnails_list = []
        house_thumbnails = Image.objects.filter(house_id=house.id)
        for thumbnail in house_thumbnails:
            thumbnail = str(thumbnail.thumbnail)
            thumbnails_list.append(thumbnail)
        return thumbnails_list

    drawings = serializers.SerializerMethodField("get_house_drawings")
    def get_house_drawings(self, house):
        drawings_list = []
        house_drawings = Drawing.objects.filter(house_id=house.id)
        for drawing in house_drawings:
            drawing = str(drawing.plan)
            drawings_list.append(drawing)
        return drawings_list

    class Meta:
        model = House
        exclude = ["time_create", "time_update"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["size"] = instance.sizes_choice[instance.size-1][1]
        data["roof"] = instance.roofs_choice[instance.roof-1][1]

        material = Material.objects.get(id=data["material"])
        data["material"] = material.name.lower()

        style = Style.objects.get(id=data["style"])
        data["style"] = style.name.lower()

        return data

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["house", "image"]


