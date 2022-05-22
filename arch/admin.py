from django.contrib import admin
from . models import House, Image, Material, Style

# admin.site.register(House)
# admin.site.register(Image)
admin.site.register(Material)
admin.site.register(Style)



# Tutorial how to add multiple images
# https://stackoverflow.com/questions/68770890/how-to-upload-multiple-files-in-django-admin
# Perhaps this can be done with: ModelAdmin.formfield_overrides
# I have tried and have not success
class ImageInline(admin.StackedInline):
    model = Image
    verbose_name = "House image"
    extra = 5
    max_num = 5

@admin.register(House)
class ImageAdmin(admin.ModelAdmin):
    list_display = ("model_name",
                    "area",
                    "floors",
                    "size",
                    "material",
                    "terrace",
                    "garage",
                    "time_create",
                    "time_update")
    inlines = [ImageInline,]

    fieldsets = (
        ("HOUSE PARAMETERS", {
            "fields": ("model_name",
                       "area",
                       "floors",
                       "size",
                       "material",
                       "style",
                       "roof",
                       "entrance",
                       "bedroom",
                       "bathroom",)
        }),
        ("HOUSE CHECKBOX PARAMETERS / check the box if yes", {
            "fields": ("kitchen_living_room",
                       "tech_room",
                       "laundry",
                       "terrace",
                       "fireplace",
                       "garage")
        })
    )

    list_filter = ("material", "floors", "size", "roof", )

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ("image", "house", "time_update")
    list_filter = ("house",)
