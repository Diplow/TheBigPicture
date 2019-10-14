from django.contrib.auth.models import User
from django.db import models


class BaseUser(User):
	image = models.ImageField(upload_to="profile_images", blank=True)
