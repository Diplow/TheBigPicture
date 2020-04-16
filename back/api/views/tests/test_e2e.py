from django.test import TestCase, Client
from api.models import BigPicture, Rating, BaseUser
import json
import os


class BigPictureViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def play(self, scenario):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        with open("{dirpath}/scenarios/{scenar}".format(dirpath=dir_path, scenar=scenario)) as json_file:
            actions = json.load(json_file)
            for action in actions:
                self.step(action)

    def step(self, action):
        if (action["name"] == "login"):
            self.client.login(**action["data"])
        if (action["name"] == "create_user"):
            self.create_user(action["data"])
        if (action["name"] == "post_big_picture"):
            self.post_big_picture(action["data"], action["expectation"])
        if (action["name"] == "post_rating"):
            self.post_rating(action["data"], action["expectation"])


    def create_user(self, user):
        usr = BaseUser.objects.create(**user)
        usr.set_password(user["password"])
        usr.save()

    def post_big_picture(self, data, expectation):
        res = self.client.post('/api/bigpictures/', data)
        self.validate(res, expectation)

    def post_rating(self, data, expectation):
        res = self.client.post('/api/ratings/', data)
        self.validate(res, expectation)

    def validate(self, resp, expectation):
        if "status" in expectation:
            self.assertEqual(resp.status_code, expectation["status"])

    def test_scenarios(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        for _, _, f in os.walk("{dir_path}/scenarios/".format(dir_path=dir_path)):
            for file in f:
                if ".json" in file:
                    with self.subTest(scenario=file):
                        self.reset_db()
                        self.play(file)

    def reset_db(self):
        BigPicture.objects.all().delete()
        Rating.objects.all().delete()
        BaseUser.objects.all().delete()

