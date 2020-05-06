from django.contrib.auth.models import AbstractUser
from django.db import models


class BaseUser(AbstractUser):
	image = models.ImageField(default="profile_images/default_user_image.png", upload_to="profile_images", blank=False)
	bio = models.TextField(default="")
	following = models.ManyToManyField("self", blank=True, through='Subscription', symmetrical=False, related_name="followers")

class Subscription(models.Model):
	author = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name="own_subscriptions")
	target = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name="follower_subscriptions")
	date = models.DateField(auto_now_add=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(fields=['target', 'author'], name='unique_subscriptions'),
		]
