from django.test import TestCase, Client
from api.models import BigPicture, Rating, BaseUser
import json
import os


class BigPictureViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        # Store client responses if we have to access them later on
        self.responses = {}

    def play(self, scenario):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        with open("{dirpath}/scenarios/{scenar}".format(dirpath=dir_path, scenar=scenario)) as json_file:
            actions = json.load(json_file)
            for action in actions:
                self.step(action)

    def step(self, action):
        if (action["action"] == "login"):
            self.client.login(**action["data"])
        elif (action["action"] == "create_user"):
            self.create_user(action["data"])
        elif (action["action"] == "send_api"):
            self.send_api(action)
        else:
            raise Exception("Unexpected action: {action}".format(action=action["action"]))

    def create_user(self, user):
        usr = BaseUser.objects.create(**user)
        usr.set_password(user["password"])
        usr.save()

    def send_api(self, action):
        http_verb = getattr(self.client, action["verb"])
        if (action["verb"] in ["post", "patch", "put"]):
            resp = http_verb(action["path"], json.dumps(self.prepare(action["data"])), content_type="application/json")
        else:
            resp = http_verb(action["path"])
        if "response" in action:
            self.responses[action["response"]] = resp.json()
        self.validate(resp, action)

    def validate(self, resp, action):
        if "status" in action["expectation"]:
            self.assertEqual(resp.status_code, action["expectation"]["status"], action["name"])
        if "response" in action["expectation"]:
            for k, v in action["expectation"]["response"].items():
                self.validate_resp(self.responses[action["response"]], k, v, action["name"])

    def validate_resp(self, item, k, v, action):
        if type(v) is dict and "_meta" in v.keys():
            if v["_meta"] == "exists":
                self.assertEqual(k in item, True, "{action}: fail because field {k} does not exist in the response".format(action=action, k=k))
            elif v["_meta"] == "isInteger":
                self.assertEqual(k in item and type(item[k]) == int, True, "{action}: fail because field {k} is not an integer in the response".format(action=action, k=k))
            else:
                raise Exception("Unexpected '_meta' field: {metafield}".format(metafield=v["_meta"]))
        elif type(v) is dict:
            for key, value in v.items():
                self.validate_resp(item[k], key, value, action)
        else:
            self.assertEqual(item[k], v, "{action}: fail because field {k} has not the expected value in the response.".format(action=action, k=k))

    def prepare(self, data):
        if type(data) is dict and "_meta" in data.keys():
            if data["_meta"] == "response":
                self.assertEqual(len(data.keys()) == 2, True, "Objects with 'response' as '_meta' field must have exactly one other key.")
                for k, v in data.items():
                    if k != "_meta":
                        return self.responses[k][v]
            raise Exception("Unexpected _meta field: {field}".format(data["_meta"]))
        elif type(data) is dict:
            res = {}
            for k, v in data.items():
                res[k] = self.prepare(data[k])
            return res
        else:
            return data

    def test_simple_1(self):
        self.play("simple_1.json")

    def test_simple_2(self):
        self.play("simple_2.json")

    def test_patch_1(self):
        self.play("patch_1.json")
