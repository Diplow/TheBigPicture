from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError

from api.models import BaseUser, BigPicture


FIXTURES_PATH = 'api/management/fixtures.json'


def anonymize_users():
    users = []
    for user in BaseUser.objects.all():
        user.email = f'user{user.id}@vde.org'
        user.set_password('vde')
        users.append(user)
    BaseUser.objects.bulk_update(users, ['email', 'password'])


class Command(BaseCommand):
    help = 'Generate fixtures to populate local dev environment database'

    def handle(self, *args, **options):
        anonymize_users()
        call_command('dumpdata', exclude=['contenttypes'], natural_foreign=True, verbosity=1, output=FIXTURES_PATH)
        self.stdout.write(self.style.SUCCESS('Successfully generated fixtures'))
