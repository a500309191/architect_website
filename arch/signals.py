from django.db.models.signals import pre_delete, post_delete, pre_save, post_save
from django.dispatch.dispatcher import receiver
from . models import Image, Plan, House
from django.conf import settings
import os
# from arch.serializer.test import
from PIL import Image as PILImage
from io import BytesIO
import urllib.request
import requests
from django.core.files.storage import default_storage as storage
from django.core.files.base import ContentFile, File
import cloudinary


@receiver(pre_save, sender=Image)
def image_overwrite(instance, **kwargs):
    try:
        current_inst = instance.__class__.objects.get(pk=instance.pk)
        if str(instance.original).split('/')[0] != 'media':
            current_inst.delete()
    except:
        pass

@receiver(pre_save, sender=Plan)
def plan_overwrite(instance, **kwargs):
    try:
        current_inst = instance.__class__.objects.get(pk=instance.pk)
        if str(instance.plan).split('/')[0] != 'media':
            current_inst.delete()
    except:
        pass

@receiver(pre_delete, sender=Image)
def image_delete(instance, **kwargs):
    instance.original.delete(False)
    instance.thumbnail.delete(False)
    # remove_empty_folders()

@receiver(pre_delete, sender=Plan)
def plan_delete(instance, **kwargs):
    instance.plan.delete(False)
    # remove_empty_folders()

@receiver(post_delete, sender=House)
def House_delete(instance, **kwargs):
    remove_empty_house_folder(instance.model_name)

@receiver(pre_save, sender=House)
def get_prev_house_name(instance, **kwargs):
    global house_was_renamed
    house_was_renamed = False
    try:
        prev_instance = House.objects.get(id=instance.id)
        global prev_house_name
        prev_house_name = prev_instance.model_name
        current_house_name = instance.model_name
        if prev_house_name != current_house_name:
            house_was_renamed = True
    except:
        pass

@receiver(post_save, sender=House)
def house_post_save_effect(instance, **kwargs):
    if house_was_renamed:
        move_rename(Image, 'original', instance)
        move_rename(Plan, 'plan', instance)
        remove_empty_house_folder(prev_house_name)

def move_rename(model, field, instance):
    objects = model.objects.filter(house_id=instance.id)
    for object in objects:
        buffer = BytesIO()
        # img = PILImage.open(requests.get(url, stream=True).raw)
        file_read = storage.open(getattr(object, field).name, "r")
        img = PILImage.open(file_read)
        print(img)
        img.save(buffer, format="JPEG", quality=90)
        setattr(object, field, File(ContentFile(buffer.getvalue()), name='renamed_image'))
        object.save()
        file_read.close()

def remove_empty_house_folder(house_name):
    try:
        cloudinary.api.delete_folder(f"media/houses/{house_name}")
    except:
        pass



# def field_handler(main_inst, inst, field, suffix, new_house_name, media):
#     initial_path = getattr(inst, field).path
#
#     file_dir = os.path.dirname(initial_path)
#     ext = initial_path.split('.')[-1]
#     index = initial_path.split('.')[0][-1]
#
#     file_dir_deconstructed = file_dir.split('\\')
#     #change house folder name
#     if field == 'thumbnail':
#         file_dir_deconstructed[-3] = main_inst.model_name
#     else:
#         file_dir_deconstructed[-2] = main_inst.model_name
#
#     new_dir = '\\'.join(part for part in file_dir_deconstructed)
#     new_name = '{}_{}_{}.{}'.format(new_house_name, suffix, index, ext)
#     new_path = '{}/{}'.format(new_dir, new_name)
#
#     os.replace(initial_path, new_path)
#
#     new_record = new_path.replace(media, '')
#     new_record = new_record.replace('\\', '/')
#     setattr(inst, field, new_record)









# @receiver(post_save, sender=House)
# def house_post_save_effect(instance, **kwargs):
#     if house_was_renamed:
#         media = settings.MEDIA_ROOT + '\\'
#         new_house_name = instance.model_name
#         images_folders = media + f'houses\\{new_house_name}\\images\\thumbnails'
#         plans_folder = media + f'houses\\{new_house_name}\\plans'
#
#         try:
#             os.makedirs(images_folders)
#             os.makedirs(plans_folder)
#         except:
#             pass
#
#         house_images = Image.objects.filter(house_id=instance.id)
#         for image in house_images:
#             field_handler(instance, image, 'original', 'image', new_house_name, media)
#             field_handler(instance, image, 'thumbnail', 'thumb', new_house_name, media)
#             image.pure_save()
#
#         house_plans = Plan.objects.filter(house_id=instance.id)
#         for plan in house_plans:
#             field_handler(instance, plan, 'plan', 'plan', new_house_name, media)
#             plan.save()
#
#         remove_empty_folders()
#
#
# def field_handler(main_inst, inst, field, suffix, new_house_name, media):
#     initial_path = getattr(inst, field).path
#
#     file_dir = os.path.dirname(initial_path)
#     ext = initial_path.split('.')[-1]
#     index = initial_path.split('.')[0][-1]
#
#     file_dir_deconstructed = file_dir.split('\\')
#     #change house folder name
#     if field == 'thumbnail':
#         file_dir_deconstructed[-3] = main_inst.model_name
#     else:
#         file_dir_deconstructed[-2] = main_inst.model_name
#
#     new_dir = '\\'.join(part for part in file_dir_deconstructed)
#     new_name = '{}_{}_{}.{}'.format(new_house_name, suffix, index, ext)
#     new_path = '{}/{}'.format(new_dir, new_name)
#
#     os.replace(initial_path, new_path)
#
#     new_record = new_path.replace(media, '')
#     new_record = new_record.replace('\\', '/')
#     setattr(inst, field, new_record)
#
# def remove_empty_folders():
#     media = settings.MEDIA_ROOT
#
#     please_stop = False
#     while not please_stop:
#         walk_list = [step[0] for step in os.walk(media)]
#         please_stop = True
#         for dir in walk_list:
#             if os.listdir(dir) == []:
#                 os.rmdir(dir)
#                 please_stop = False

