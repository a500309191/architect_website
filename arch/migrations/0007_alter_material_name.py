# Generated by Django 4.0.2 on 2022-03-15 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('arch', '0006_material_style_house_roof_alter_house_size_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='material',
            name='name',
            field=models.CharField(help_text='Input material type', max_length=30, verbose_name='Material type'),
        ),
    ]
