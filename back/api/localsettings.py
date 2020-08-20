import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('SQL_DATABASE', 'postgres'),
        'USER': os.getenv('SQL_USER', 'postgres'),
        'PASSWORD': os.getenv('SQL_PASSWORD', 'postgres'),
        'HOST': os.getenv('SQL_HOST', 'db'),
        'PORT': '5432',
    }
}

SECRET_KEY = os.getenv('SECRET_KEY')