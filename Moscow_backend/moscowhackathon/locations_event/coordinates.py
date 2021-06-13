"""
from googlemaps import Client
gmaps = Client("AIzaSyBRGLxJHyuJQasiRFerMHByjxbzZOt3J6s")

address = 'Туполева 5'
geocode_result = gmaps.geocode(address)

#lat, lng = gmaps.address_to_latlng(address)
print(geocode_result)
"""
#55.653467, 37.736375


import requests

def fetch_coordinates(apikey, place):
    base_url = "https://geocode-maps.yandex.ru/1.x"
    params = {"geocode": place, "apikey": apikey, "format": "json"}
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    found_places = response.json()['response']['GeoObjectCollection']['featureMember']
    most_relevant = found_places[0]
    lon, lat = most_relevant['GeoObject']['Point']['pos'].split(" ")
    return lat, lon


#apikey = "0230be74-d505-4e51-9c59-73c2b8f9e27a"
#print(fetch_coordinates(apikey, "Ростов-на-Дону, Туполева 5"))


#a = [1, 2, 3, 4, 5, 6, 7]
#b = [1, 2, 3]
#print(a in b)