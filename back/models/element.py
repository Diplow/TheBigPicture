from django.db.models import Model
from django.db.models import TextField
from django.db.models import CharField
from rest_framework.serializers import ModelSerializer


class ArguableElement(Model):
	title = CharField(max_length=150)
	body = TextField()
	_type = CharField(max_length=30, editable=False)

	def save(self, *args, **kwargs):
		self._type = type(self).__name__
		super().save(*args, **kwargs)

	def __str__(self):
		return "[{_class}] {_title} ({_id})".format(_class=self._type, _title=self.title, _id=self.id)


class ArguableElementSerializer(ModelSerializer):

	class Meta:
		model = ArguableElement
		fields = "__all__"
		read_only_fields = ("_type",)
