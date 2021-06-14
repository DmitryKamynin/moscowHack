# Generated by Django 3.2.4 on 2021-06-13 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations_event', '0005_auto_20210613_2106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='photos/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='event',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='locations_event.Tags', verbose_name='Тэги'),
        ),
        migrations.AlterField(
            model_name='tags',
            name='title',
            field=models.CharField(max_length=255, verbose_name='Тэг'),
        ),
    ]
