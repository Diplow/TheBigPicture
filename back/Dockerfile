# pull official base image
FROM python:3.7-alpine

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR /opt/tbp/back


# install psycopg2
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps

# install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /opt/tbp/back
RUN pipenv install --skip-lock --system --dev

# copy project
COPY . /opt/tbp/back

# run entrypoint.sh
ENTRYPOINT ["/opt/tbp/back/entrypoint.sh"]
