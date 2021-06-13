from django.urls import path, include
from locations_event.views import *

urlpatterns = [
    path('spot/', SpotsList.as_view()),
    path('spot/<int:pk>/', SpotsDetail.as_view()),
    path('category/', CategoryList.as_view()),
    path('category/<int:pk>/', CategoryDetail.as_view()),
    path('event/', EventList.as_view()),
    path('event/<int:pk>/', EventDetail.as_view()),
    path('tag/', TagsList.as_view()),
    path('tag/<int:pk>/', TagsDetail.as_view()),
    path('upcoming-events/', UpcomingEvents.as_view())
]
