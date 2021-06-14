import requests
from datetime import  datetime

start = datetime.now()
spots = requests.get("https://www.mos.ru/api/newsfeed/v4/frontend/json/ru/spot")
list_spots = list()
for i in range(spots.json()["_meta"]["pageCount"]):
    spots = requests.get("https://www.mos.ru/api/newsfeed/v4/frontend/json/ru/spot?page={0}".format(i+1))
    #print(i)
    for k in range(len(spots.json()["items"])):
        list_spots.append(spots.json()["items"][k])
        #print(spots.json()["items"][k]["id"])
