from django.db import models
from PIL import Image as PILImage
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys


class House(models.Model):
    def makeChoice(maxNumber):
        # Func for making tuple of tuples like:
        # ((1,'1'), (2,'2'), ..., (max_number,'max_number'))
        # where argument is a max number
        choiceTuple = ()
        for i in range(1, maxNumber + 1):
            n = [i]
            s = [str(i)]
            z = zip(n, s)
            for i in z:
                choiceTuple += (i,)
        return choiceTuple

    model_name = models.CharField(max_length=50,
                             verbose_name="Model name")
    area = models.FloatField(default=0.00)
    floors = models.IntegerField(choices=makeChoice(5),
                                 verbose_name="Floors",
                                 default=1)
    material = models.ForeignKey('Material',
                                 on_delete=models.CASCADE,
                                 verbose_name="Material type",
                                 null=True)
    style = models.ForeignKey('Style',
                              on_delete=models.CASCADE,
                              verbose_name="Architectural style",
                              null=True)
    roof = models.ForeignKey('Roof',
                             on_delete=models.CASCADE,
                             verbose_name="Roof type",
                             null=True)
    entrance = models.IntegerField(choices=makeChoice(5),
                                   verbose_name="Number of entrances",
                                   default=1)
    bedroom = models.IntegerField(choices=makeChoice(10),
                                  verbose_name="Number of bedrooms",
                                  default=1)
    bathroom = models.IntegerField(choices=makeChoice(10),
                                  verbose_name="Number of bathrooms",
                                  default=1)

    #checkbox fields
    quest = "Does house have a..."
    kitchen_living_room = models.BooleanField(default=True, verbose_name="Kitchen connected to living room",)
    tech_room = models.BooleanField(default=True, verbose_name=f"{quest} technical room",)
    terrace = models.BooleanField(default=False, verbose_name=f"{quest} terrace",)
    garage = models.BooleanField(default=False, verbose_name=f"{quest} garage",)

    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.model_name


class PathRename:
    def __init__(self, field, path, suffix, ext):
        self.field = field
        self.path = path
        self.suffix = suffix
        self.ext = ext

    def __call__(self, instance, filename):
        import os
        #field = getattr(instance, self.field)
        field = self.field
        path = self.path
        suffix = self.suffix
        ext = self.ext

        if ext == "original":
            ext = filename.split('.')[-1]
        else:
            ext = "jpg"
        item_number = 1
        upload_to = f"houses/{instance.house}/{path}"
        filename = '{}_{}_{}.{}'.format(instance.house, suffix, item_number, ext)
        fields = {}
        fields[field] = f"{upload_to}/{filename}"

        Instances = instance.__class__.objects.all()
        try:
            Instance = instance.__class__.objects.get(**fields)
            while Instance in Instances:
                item_number += 1
                filename = '{}_{}_{}.{}'.format(instance.house, suffix, item_number, ext)
                fields[field] = f"{upload_to}/{filename}"
                Instance = instance.__class__.objects.get(**fields)
        except:
            pass

        return os.path.join(upload_to, filename)

    def deconstruct(self):
        return ('arch.models.PathRename', [self.field, self.path, self.suffix, self.ext], {})


class Image(models.Model):
    house = models.ForeignKey("House",
                              on_delete=models.CASCADE,
                              help_text="Please attach images",
                              verbose_name="House",
                              null=True,
                              blank=False)
    image = models.ImageField(null=True,
                              blank=True,
                              upload_to=PathRename(field="image",
                                                   path="images",
                                                   suffix="image",
                                                   ext="original"))
    image_thumbnail = models.ImageField(null=True,
                                  blank=True,
                                  upload_to=PathRename(field="thumbnail",
                                                       path="images/thumbnails",
                                                       suffix="thumb",
                                                       ext="jpg"))
    time_update = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        output_size = (300, 300)
        output_thumb = BytesIO()

        img = PILImage.open(self.image.path)
        img.thumbnail(output_size)
        img.save(output_thumb, format="JPEG", quality=90)

        self.image_thumbnail = InMemoryUploadedFile(output_thumb,
                                              "ImageField",
                                              "thumbnail",
                                              None,
                                              sys.getsizeof(output_thumb),
                                              None)
        super().save()

    def __str__(self):
        return '%s' % self.image


class Plan(models.Model):
    house = models.ForeignKey("House",
                              on_delete=models.CASCADE,
                              help_text="Please attach drawings",
                              verbose_name="House",
                              null=True,
                              blank=False)
    plan = models.ImageField(null=True,
                             blank=True,
                             upload_to=PathRename(field="plan",
                                                  path="drawings",
                                                  suffix="plan",
                                                  ext="original"))
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % self.plan


class Material(models.Model):
    name = models.CharField(max_length=30,
                            help_text="Input material type",
                            verbose_name="Material type")
    def __str__(self):
        return self.name


class Style(models.Model):
    name = models.CharField(max_length=30,
                            help_text="Input architectural style",
                            verbose_name="Architectural style")
    def __str__(self):
        return self.name

class Roof(models.Model):
    name = models.CharField(max_length=30,
                            help_text="Input roof type",
                            verbose_name="Roof type")
    def __str__(self):
        return self.name