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
            path = self.prepare(action["path"])
            resp = http_verb(path, json.dumps(self.prepare(action["data"])), content_type="application/json")
        else:
            path = self.prepare(action["path"])
            resp = http_verb(path)
        if "response" in action:
            self.responses[action["response"]] = resp.json()
        self.validate(resp, action)

    def validate(self, resp, action):
        for key in action["expectation"]:
            if key == "status":
                self.assertEqual(resp.status_code, action["expectation"]["status"], action["name"])
            elif key == "response":
                for k, v in action["expectation"]["response"].items():
                    self.validate_resp(self.responses[action["response"]], k, self.prepare(v), action["name"])
            else:
                raise Exception("Unexpected field {key} for the expectation object".format(key=key))

    def validate_resp(self, item, k, v, action):
        if type(v) is dict and "_meta_validate" in v.keys():
            if v["_meta_validate"] == "exists":
                self.assertEqual(k in item, True, "{action}: fail because field {k} does not exist in the response".format(action=action, k=k))
            elif v["_meta_validate"] == "isInteger":
                self.assertEqual(k in item and type(self.prepare(item[k])) == int, True, "{action}: fail because field {k} is not an integer in the response".format(action=action, k=k))
            else:
                raise Exception("Unexpected '_meta_validate' field: {metafield}".format(metafield=v["_meta_validate"]))
        elif type(v) is dict:
            for key, value in v.items():
                self.validate_resp(item[k], key, value, action)
        else:
            self.assertEqual(item[k], v, "{action}: fail because field {k} has not the expected value in the response.".format(action=action, k=k))

    def prepare(self, data):
        if type(data) is dict and "_meta" in data.keys():
            if data["_meta"] == "response":
                return self.prepare_meta_response(data)
            if data["_meta"] == "str_replace":
                return self.prepare_meta_str_replace(data)
            raise Exception("Unexpected _meta field: {field}".format(field=data["_meta"]))
        elif type(data) is dict:
            return { k: self.prepare(data[k]) for k, v in data.items() }
        else:
            return data

    def prepare_meta_str_replace(self, data):
        self.assertEqual("str" in data.keys(), True, "Objects with 'str_replace' as '_meta' field must have a 'str' field.")
        res = data["str"]
        for k, v in data.items():
            if k in ["_meta", "str"]:
                pass
            else:
                res = res.replace(k, str(self.prepare(v)))
        return res

    def prepare_meta_response(self, data):
        self.assertEqual(len(data.keys()) == 2, True, "Objects with 'response' as '_meta' field must have exactly one other key.")
        for k, v in data.items():
            if k != "_meta":
                return self.responses[k][self.prepare(v)]

    def test_simple_1(self):
        self.play("simple_1.json")

    def test_simple_2(self):
        self.play("simple_2.json")

    def test_patch_1(self):
        self.play("patch_1.json")

    def test_ownsubjects_1(self):
        self.play("ownsubjects_1.json")

    def test_followers_1(self):
        self.play("followers_1.json")
