from rest_framework import serializers
from locations_event.models import *


class SpotsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ('id', 'title', 'address', 'lon', 'lat')


class EventSerialize(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'price', 'cat_id', 'org_id', 'image', 'date_time_start',
                  'date_time_finish', 'tags')


class CategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')


class TagsSerialize(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ('id', 'title')
