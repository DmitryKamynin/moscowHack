from django.db import models

# Create your models here.


class Spot(models.Model):
    id = models.IntegerField(verbose_name="ID места", primary_key=True)
    title = models.TextField(blank=True, null=True, verbose_name="Название")
    address = models.TextField(blank=True, null=True, verbose_name="Адрес")
    lon = models.FloatField(blank=True, null=True, verbose_name="Долгота")
    lat = models.FloatField(blank=True, null=True, verbose_name="Широта")
    place_type_id = models.IntegerField(blank=True, null=True, verbose_name="")
    foundation_id = models.IntegerField(blank=True, null=True, verbose_name="")
    ebs_id = models.IntegerField(blank=True, null=True, verbose_name="")
    ebs_title = models.IntegerField(blank=True, null=True, verbose_name="")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Местоположение мероприятия"
        verbose_name_plural = "Местоположения мероприятия"


class Event(models.Model):
    cat_id = models.ForeignKey("Category", on_delete=models.PROTECT)
    org_id = models.ForeignKey("Spot", on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    date_time_start = models.DateTimeField(verbose_name="Дата и время начала")
    date_time_finish = models.DateTimeField(verbose_name="Дата и время окончания")
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    image = models.ImageField(upload_to='photos/%Y/%m/%d/', max_length=255)

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
