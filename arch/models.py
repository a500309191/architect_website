from django.db import models

"""
HOUSE ATTRIBUTES:
Model 
Area
Floors - [1,2,3,4,5]
Size - [tiny, medium, large]
Material - [stone, wood]
Roof - [pitched, flat]
Style - [traditional, modern]
Rooms - [kitchen, bedroom, washroom, ...]
Dimensions - [n*m]
Images
"""

class House(models.Model):
    model = models.CharField(max_length=50,
                             verbose_name="model number")
    area = models.FloatField(default=0.00)

    floors_choice = ((1,'1'),
                     (2,'2'),
                     (3,'3'),
                     (4,'4'))
    floors = models.IntegerField(choices=floors_choice,
                                 default=1)

    sizes_choice = ((1, 'tiny'),
                    (2, 'medium'),
                    (3, 'large'))
    size = models.IntegerField(choices=sizes_choice,
                               help_text="Choose house size",
                               verbose_name="House size")

    material = models.ForeignKey('Material',
                                 on_delete=models.CASCADE,
                                 help_text="Choose material type",
                                 verbose_name="Material type",
                                 null=True)

    style = models.ForeignKey('Style',
                              on_delete=models.CASCADE,
                              help_text="Choose architectural style",
                              verbose_name="Architectural style",
                              null=True)

    roofs_choice = ((1,'pitched'),
                    (2,'flat'))
    roof = models.IntegerField(choices=roofs_choice,
                               help_text="Choose roof type",
                               verbose_name="Roof type",
                               null=True)

    def __str__(self):
        return self.model

class Image(models.Model):
    house = models.ForeignKey('House',
                                on_delete=models.CASCADE,
                                help_text="Please attach images",
                                verbose_name="house_id",
                                null=True,
                                blank=False)
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return '%s' % self.image

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

