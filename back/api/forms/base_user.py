from django_registration.forms import RegistrationForm

from api.models import BaseUser


class BaseUserForm(RegistrationForm):
    class Meta(RegistrationForm.Meta):
        model = BaseUser
