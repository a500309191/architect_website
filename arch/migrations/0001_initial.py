# Generated by Django 4.0.2 on 2022-02-23 20:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.CharField(max_length=50, verbose_name='model number')),
                ('area', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('house', models.ForeignKey(help_text='Please attach images', null=True, on_delete=django.db.models.deletion.CASCADE, to='arch.house', verbose_name='house_id')),
            ],
        ),
    ]