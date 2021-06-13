from django.contrib import admin
from locations_event.models import *


class SpotAdmin(admin.ModelAdmin):
    fields = ['title', 'address', 'lon', 'lat']
    list_display = ('id', 'title', 'address', 'lon', 'lat')
    search_fields = ['title']


class CategoryAdmin(admin.ModelAdmin):
    fields = ['title']
    list_display = ('id', 'title')
    search_fields = ['title']


class EventAdmin(admin.ModelAdmin):
    fields = ['title', 'description', 'price', 'cat_id', 'org_id', 'image']
    list_display = ('id', 'title', 'description', 'price', 'cat_id', 'org_id', 'image')
    search_fields = ['title']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Spot, SpotAdmin)
