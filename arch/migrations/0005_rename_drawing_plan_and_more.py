# Generated by Django 4.0.4 on 2022-07-05 16:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('arch', '0004_remove_house_fireplace_remove_house_laundry_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Drawing',
            new_name='Plan',
        ),
        migrations.RenameField(
            model_name='image',
            old_name='thumbnail',
            new_name='image_thumbnail',
        ),
    ]