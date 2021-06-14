from django.shortcuts import render
from rest_framework import generics
from locations_event.models import *
from locations_event.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from locations_event.distance_event import Distance
from django.http import HttpResponse, JsonResponse
from django.db.models import Q


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
        #print(list(self.request.query_params["tags"]))#.split(","))
        #print(type(list(self.request.query_params["tags"])))#.split(",")))
       #print(list(self.request.query_params["tags"]))
        if "category" in self.request.query_params:
            return Event.objects.filter(cat_id=self.request.query_params["category"])
        elif "tags" in self.request.query_params:
            #print(set(Event.objects.filter(tags__id__in = [1, 2, 6, 7])))
            #criterion1 = Q(tags__id__in=(list(self.request.query_params["tags"])[0]))
            #criterion2 = Q(tags__id__in=(list(self.request.query_params["tags"])[1]))
            #criterion3 = Q(tags__id__in=(list(self.request.query_params["tags"])[2]))
            #return set(Event.objects.filter(criterion1 | criterion2 | criterion3))
            return set(Event.objects.filter(tags__in=self.request.query_params["tags"]))
        else:
            return Event.objects.all()


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerialize


class TagsList(generics.ListCreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerialize


class TagsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerialize


class UpcomingEvents(APIView):
    def get(self, request):
        dict_upcoming = dict()
        list_upcoming = list()
        events = Event.objects.all()
        #list_data = (EventSerialize(events, many=True).data)
        for event in events:
            #print(event)
            #print(f"lon  {event.org_id.lon}  lat {event.org_id.lat}
            #dict_upcoming["id"] = event.pk
            dict_upcoming[event.pk] = Distance.get_distance(float(self.request.query_params["lon"]),
                                                            float(self.request.query_params["lat"]),
                                                            event.org_id.lon,
                                                            event.org_id.lat
                                                            )

        kk = {k: v for k, v in sorted(dict_upcoming.items(), key=lambda item: item[1])}
        i = 0
        for key in kk.keys():
            #print(kk[key])
            if i >= 10:
                break
            else:
                evnt = Event.objects.filter(pk=key)
                event_dict = EventSerialize(evnt, many=True).data[0]

                #event_dict[""]
                #print(event_dict)
                spot = Spot.objects.filter(pk=int(evnt.values()[0]["org_id_id"]))
                event_dict["lon"] = spot.values()[0]["lon"]
                event_dict["lat"] = spot.values()[0]["lat"]
                list_upcoming.append(event_dict)
            i += 1

        return Response(list_upcoming)


        #return Response(.data)
        # category = self.request.user
        #print(self.request.query_params["category"])

        #try:
        #    return Event.objects.filter()
        #except:
        #    return Event.objects.all()