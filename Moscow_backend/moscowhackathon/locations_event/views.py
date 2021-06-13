from django.shortcuts import render
from rest_framework import generics
from locations_event.models import *
from locations_event.serializers import *
# Create your views here.


class SpotsList(generics.ListCreateAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotsSerialize


class SpotsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotsSerialize


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialize


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialize


class EventList(generics.ListCreateAPIView):
    #queryset = Event.objects.all()
    serializer_class = EventSerialize

    def get_queryset(self):
        # category = self.request.user
        #print(self.request.query_params["category"])
        try:
            return Event.objects.filter(cat_id=self.request.query_params["category"])
        except:
            return Event.objects.all()


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerialize


class EventsByCategory(generics.ListCreateAPIView):
    serializer_class = EventSerialize

