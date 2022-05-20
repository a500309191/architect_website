from django.contrib import admin
from . models import House, Image, Material, Style

#admin.site.register(House)
admin.site.register(Image)
admin.site.register(Material)
admin.site.register(Style)


# Tutorial how to add multiple images
# https://stackoverflow.com/questions/68770890/how-to-upload-multiple-files-in-django-admin
# Perhaps this can be done with: ModelAdmin.formfield_overrides
# I have tried and have not success
class ImageInline(admin.StackedInline):
    model = Image
    verbose_name = 'House image'
    extra = 4
    max_num = 10

@admin.register(House)
class ImageAdmin(admin.ModelAdmin):
    inlines = [ImageInline,]
