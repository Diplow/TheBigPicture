from django.contrib.auth.models import AbstractUser
from django.db import models


class BaseUser(AbstractUser):
	image = models.ImageField(default="profile_images/default_user_image.png", upload_to="profile_images", blank=False)
	bio = models.TextField(default="")
