from django.db.models.signals import pre_delete, post_save, pre_save
from django.dispatch.dispatcher import receiver
from . models import Image, Plan, House
from django.conf import settings
import os


@receiver(pre_delete, sender=Image)
def image_delete(instance, **kwargs):
    instance.image.delete(False)
    instance.image_thumbnail.delete(False)

@receiver(pre_delete, sender=Plan)
def plan_delete(instance, **kwargs):
    instance.plan.delete(False)

@receiver(post_save, sender=House)
def house_change(instance, created, **kwargs):
    if created:
        pass
    else:
        import os
        house_images = Image.objects.filter(house_id=instance.id)

        media = settings.MEDIA_ROOT + '\\'
        new_house_name = instance.model_name

        images_folders = 'houses\\{}\\images\\thumbnails'.format(new_house_name)
        plans_folders = 'houses\\{}\\plans'.format(new_house_name)

        try:
            os.makedirs(media + images_folders)
            os.makedirs(media + plans_folders)
        except:
            pass

        for image in house_images:
            image_initial_path = image.image.path
            thumb_initial_path = image.image_thumbnail.path

            file_dir = os.path.dirname(image_initial_path)

            image_ext = image_initial_path.split('.')[-1]
            index = image_initial_path.split('.')[0][-1]

            file_dir_deconstructed = file_dir.split('\\')
            file_dir_deconstructed[-2] = instance.model_name
            new_image_dir = '\\'.join(part for part in file_dir_deconstructed)

            file_dir_deconstructed.append('thumbnails')
            new_thumb_dir = '\\'.join(part for part in file_dir_deconstructed)

            new_image_name = '{}_{}_{}.{}'.format(new_house_name, 'image', index, image_ext)
            new_thumb_name = '{}_{}_{}.{}'.format(new_house_name, 'thumb', index, image_ext)

            new_image_path = '{}\{}'.format(new_image_dir, new_image_name)
            new_thumb_path = '{}\{}'.format(new_thumb_dir, new_thumb_name)


            os.replace(image_initial_path, new_image_path)
            os.replace(thumb_initial_path, new_thumb_path)


            # new_image_record = new_image_path.replace(media, '')
            # image.image = new_image_record



