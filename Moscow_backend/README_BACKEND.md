СРЕДА ЗАПУСКА
------------
1) развертывание сервиса производится на debian-like linux (debian 9+);
2) требуется установленная СУБД sqlite;


УСТАНОВКА
------------
### Установка пакетов для запуска django сервера

Выполните 
~~~
sudo apt-get update
sudo apt-get upgrade
pip3 install django
pip3 install djangorestframework
pip3 install Pillow
pip3 install django-cors-headers
~~~


### Выполнение миграций
Для заполнения базы данных системной информацией выполните в папке с файлом manage.py: 
~~~
python3 manage.py makemigration
python3 manage.py migrate
~~~
и согласитесь с запросом

### Заполнение данными

Для заполнения таблиц можно перейти в панель администратора. 

Выполните данные действия
~~~
python3 manage.py createsuperuser
Введите данные
python3 manage.py runserver
Перейдите по ссылке http://127.0.0.1:8000/admin
Введите логин и пароль который вы придумали на первом шаге
~~~
