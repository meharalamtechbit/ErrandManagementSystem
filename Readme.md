# To Create requirement file run command

pip freeze > requirements.txt

# To install packages run command 

pip install -r requirements.txt


==============================================

# How to run

(1) install python for windows
(2) Create virtual environment by running below command in cmd
      (a) py -m pip install virtualenvwrapper-win
      (b) mkvirtualenv myproject 
      (c) workon myproject
(3) pip install -r requirements.txt
(4) python manage.py migrate
(4) Run command  python manage.py createsuperuser
(5) Create Migration
        python manage.py makemigrations
        python manage.py migrate
(6) Run command py manage.py runserver 



