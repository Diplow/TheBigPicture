
from api.serializers.bigpicture import BigPictureSerializer
from api.models import Argument


class ArgumentSerializer(BigPictureSerializer):

	class Meta:
		model = Argument
		fields = "__all__"
