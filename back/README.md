
# Django Application

Start a postgres db.
> PERSISTENT_DATA=/opt/vuedensemble/docker/volumes/postgres // use whatever you want
> docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -p 5432:5432 -v PERSISTENT_DATA:/var/lib/postgresql/data  postgres:10.5-alpine

Start the server
> python manage.py runserver

