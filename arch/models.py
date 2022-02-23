from django.db import models

"""
HOUSE ATTRIBUTES:
Model 
Area
Floors - [1,2,3,4,5]
Size - [tiny, medium, large]
Dimensions - [n*m]
Material - [stone, wood]
Roof - [pitched, flat]
Style - [traditional, modern]
Rooms - [kitchen, bedroom, washroom, ...]
Images
"""

class House(models.Model):
    model = models.CharField(max_length=50, verbose_name="model number")
    area = models.FloatField(default=0.0)

    floors_choice = ((1,'1'),
                     (2,'2'),
                     (3,'3'),
                     (4,'4'))
    floors = models.IntegerField(choices=floors_choice, default=1)

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