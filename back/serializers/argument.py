
from back.serializers.bigpicture import BigPictureSerializer
from back.models import Argument


class ArgumentSerializer(BigPictureSerializer):

	class Meta:
		model = Argument
		fields = "__all__"
