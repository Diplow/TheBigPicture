
from django.db.models import IntegerField
from django.db.models import ForeignKey
from django.db.models import CASCADE

from api.models.bigpicture import BigPicture


class Argument(BigPicture):
	nature = IntegerField(choices=((1, "pro"), (2, "con")))
