from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import House, Image

class HouseSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField("_get_house_images")
    def _get_house_images(self, house):
        images_list = []
        house_images = Image.objects.filter(house_id=house.id)
        for image in house_images:
            image = str(image.image)
            images_list.append(image)
        return images_list

    # def _get_house_images(self, house):
    #     images_dict = {}
    #     index = 1
    #     house_images = Image.objects.filter(house_id=house.id)
    #     for image in house_images:
    #         image = str(image.image)
    #         images_dict.setdefault(f"image_{index}", image)
    #         index += 1
    #     return images_dict

    class Meta:
        model = House
        exclude = ["time_create", "time_update"]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["house", "image"]


