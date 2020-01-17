from django.contrib.auth.models import User
from django.db import models


class BaseUser(User):
	image = models.ImageField(default="profile_images/default_user_image.png", upload_to="profile_images", blank=False)
