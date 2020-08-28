from django.db import models
from django.conf import settings


class Category(models.Model):
  title = models.CharField(max_length=300)
  description = models.TextField(blank=True)
  label = models.CharField(primary_key=True, max_length=30)
  image = models.ImageField(upload_to="category_images", blank=False)

  def __unicode__(self):
    return self.id
