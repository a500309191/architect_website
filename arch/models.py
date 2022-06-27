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
    sizes_choice = ((1, "tiny"),
                    (2, "medium"),
                    (3, "large"),
                    (4, "extra large"))
    size = models.IntegerField(choices=sizes_choice,
                               verbose_name="House size",
                               default=2)
    material = models.ForeignKey('Material',
                                 on_delete=models.CASCADE,
                                 verbose_name="Material type",
                                 null=True)
    style = models.ForeignKey('Style',
                              on_delete=models.CASCADE,
                              verbose_name="Architectural style",
                              null=True)
    roofs_choice = ((1,'pitched'),
                    (2,'flat'),
                    (3, 'combined'))
    roof = models.IntegerField(choices=roofs_choice,
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
    quest = "Is there a"
    kitchen_living_room = models.BooleanField(default=True, verbose_name="Kitchen connected to living room",)
    tech_room = models.BooleanField(default=True, verbose_name=f"{quest} technical room",)
    laundry = models.BooleanField(default=False, verbose_name=f"{quest} laundry",)
    terrace = models.BooleanField(default=False, verbose_name=f"{quest} terrace",)
    fireplace = models.BooleanField(default=False, verbose_name=f"{quest} fireplace",)
    garage = models.BooleanField(default=False, verbose_name=f"{quest} garage",)

    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.model_name


class Image(models.Model):

    def path_rename(self, filename):
        import os
        images = Image.objects.all()
        if filename == "thumbnail":
            upload_to = f"images/{self.house}/thumbs"
            thumb = "thumb"
            ext = "jpg"
            thumb_number = 1
            filename = "{}_{}_{}.{}".format(self.house, thumb_number, thumb, ext)
            try:
                thumbnail = Image.objects.get(thumbnail=f"{upload_to}/{filename}")
                while thumbnail in images:
                    thumb_number += 1
                    filename = "{}_{}_{}.{}".format(self.house, thumb_number, thumb, ext)
                    thumbnail = Image.objects.get(thumbnail=f"{upload_to}/{filename}")
            except:
                pass
        else:
            upload_to = f"images/{self.house}"
            ext = filename.split('.')[-1]
            image_number = 1
            filename = "{}_{}.{}".format(self.house, image_number, ext)
            try:
                image = Image.objects.get(image=f"{upload_to}/{filename}")
                while image in images:
                    image_number += 1
                    filename = "{}_{}.{}".format(self.house, image_number, ext)
                    image = Image.objects.get(image=f"{upload_to}/{filename}")
            except:
                pass

        return os.path.join(upload_to, filename)


    house = models.ForeignKey("House",
                              on_delete=models.CASCADE,
                              help_text="Please attach images",
                              verbose_name="House",
                              null=True,
                              blank=False)
    image = models.ImageField(null=True, blank=True, upload_to=path_rename)
    thumbnail = models.ImageField(null=True, blank=True, upload_to=path_rename)
    time_update = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        output_size = (300, 300)
        output_thumb = BytesIO()

        img = PILImage.open(self.image.path)
        img.thumbnail(output_size)
        img.save(output_thumb, format="JPEG", quality=90)

        self.thumbnail = InMemoryUploadedFile(output_thumb,
                                              "ImageField",
                                              "thumbnail",
                                              None,
                                              sys.getsizeof(output_thumb),
                                              None)
        super().save()

    def __str__(self):
        return '%s' % self.image


class PathRename:
    def __init__(self, field, path, suffix, ext):
        self.field = field
        self.path = path
        self.suffix = suffix
        self.ext = ext

    def __call__(self, instance, filename):
        field = getattr(instance, self.field)
        path = self.path
        suffix = self.suffix
        ext = self.ext

        import os
        if ext == "original":
            ext = filename.split('.')[-1]
        else:
            ext = "jpg"
        item_number = 1
        upload_to = f"houses/{instance.house}/{path}"
        filename = '{}_{}_{}.{}'.format(instance.house, item_number, suffix, ext)
        Instances = instance.__class__.objects.all()
        try:
            Instance = instance.__class__.objects.get(plan=f'{upload_to}/{filename}')
            while Instance in Instances:
                item_number += 1
                filename = '{}_{}_{}.{}'.format(instance.house, item_number, suffix, ext)
                Instance = instance.__class__.objects.get(plan=f'{upload_to}/{filename}')
        except:
            pass
        return os.path.join(upload_to, filename)


class Drawing(models.Model):

    house = models.ForeignKey("House",
                              on_delete=models.CASCADE,
                              help_text="Please attach drawings",
                              verbose_name="House",
                              null=True,
                              blank=False)
    plan = models.ImageField(null=True, blank=True, upload_to=PathRename(field="plan",
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
