
from django.db.models import IntegerField
from django.db.models import ForeignKey

from back.models.bigpicture import BigPicture


class Argument(BigPicture):
	nature = IntegerField(choices=((1, "pro"), (2, "con")))
	bigPicture = ForeignKey(BigPicture, related_name="arguments", on_delete=True)
