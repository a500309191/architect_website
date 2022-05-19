from django.db import models

"""
HOUSE ATTRIBUTES:
Model 
Area
Floors - [1,2,3,4,5]
Size - [tiny, medium, large]
Material - [stone, wood]
Roof - [pitched, flat]
Style - [traditional, contemporary]
Entrances
Images

Rooms
    bedroom
    bathroom
    *connected lounge-kitchen 
    *utility room
    *laundry
    *terrace
    *fireplace

"""

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

    model = models.CharField(max_length=50,
                             verbose_name="model number")
    area = models.FloatField(default=0.00)

    floors = models.IntegerField(choices=makeChoice(10),
                                 default=1)

    sizes_choice = ((1, 'tiny'),
                    (2, 'medium'),
                    (3, 'large'))
    size = models.IntegerField(choices=sizes_choice,
                               help_text="Select house size",
                               verbose_name="House size")

    material = models.ForeignKey('Material',
                                 on_delete=models.CASCADE,
                                 help_text="Select material type",
                                 verbose_name="Material type",
                                 null=True)

    style = models.ForeignKey('Style',
                              on_delete=models.CASCADE,
                              help_text="Select architectural style",
                              verbose_name="Architectural style",
                              null=True)

    roofs_choice = ((1,'pitched'),
                    (2,'flat'))
    roof = models.IntegerField(choices=roofs_choice,
                               help_text="Select roof type",
                               verbose_name="Roof type",
                               null=True)

    entrance = models.IntegerField(choices=makeChoice(5),
                                   help_text="Select the number of entrances",
                                   verbose_name="Number of entrances",
                                   default=1)

    bedroom = models.IntegerField(choices=makeChoice(10),
                                  help_text="Select the number of bedrooms",
                                  verbose_name="Number of bedrooms",
                                  default=1)

    bathroom = models.IntegerField(choices=makeChoice(10),
                                  help_text="Select the number of bathrooms",
                                  verbose_name="Number of bathrooms",
                                  default=1)

    #checkbox fields
    cb_help = "Check the box if yes"

    kitchen_living_room = models.BooleanField(default=False, help_text=cb_help,
                                         verbose_name="Kitchen connected to living room",)

    tech_room = models.BooleanField(default=False, help_text=cb_help,
                                         verbose_name="Is there a technical room",)

    laundry = models.BooleanField(default=False, help_text=cb_help,
                                         verbose_name="Is there a laundry",)

    terrace = models.BooleanField(default=False, help_text=cb_help,
                                         verbose_name="Is there a terrace",)

    fireplace = models.BooleanField(default=False, help_text=cb_help,
                                         verbose_name="Is there a fireplace",)


    def __str__(self):
        return self.model


class Image(models.Model):
    house = models.ForeignKey('House',
                              on_delete=models.CASCADE,
                              help_text="Please attach images",
                              verbose_name="Images",
                              null=True,
                              blank=False)
    image = models.ImageField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.image

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
