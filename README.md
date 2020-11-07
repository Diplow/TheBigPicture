![Django CI](https://github.com/Diplow/TheBigPicture/workflows/Django%20CI/badge.svg?branch=master) ![FRONT](https://github.com/Diplow/TheBigPicture/workflows/Node.js%20CI/badge.svg?branch=master)

# VDE - TheBigPicture

[VDE is a webplatform](https://vuedensemble.org), a non profit organization and an open source project: it aims to change how we do politics. [Here if you want to know more (in french)](https://vuedensemble.org/bigpicture/26).

# Back - server side

The back is responsible for the data and exposes an API to the client to access and modify it. Basically data is made of users, political analysis, comments about these analysis, and evaluations of these analysis.

# Front - client side

The front allows people to create an account, display political analysis, search them, comment them and evaluate them.

# Run locally

Run back & front with docker-compose:

```console
foo@bar:~$ docker-compose -f docker-compose.local.yml up -d
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Load sample data:

```console
foo@bar:~$ docker exec -it back python manage.py load_fixtures
```
