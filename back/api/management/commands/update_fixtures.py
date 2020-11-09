from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError
from django.contrib.sessions.models import Session
from django.contrib.auth.models import Permission

from api.models import BaseUser, BigPicture, Category


FIXTURES_PATH = 'api/management/fixtures.json'


def anonymize_users():
    users = []
    images = ["communicationcitizen", "judgecitizen", "mepcitizen", "strategycitizen", "thinkcitizen"]
    for user in BaseUser.objects.all():
        user.email = "user{userid}@vde.org".format(userid=user.id)
        user.set_password('vde')
        user.image = "profile_images/{img}.png".format(img=images[user.id % len(images)])
        users.append(user)
    BaseUser.objects.bulk_update(users, ['email', 'password', 'image'])

def update_categories():
    categories = []
    images = ["communicationcitizen", "judgecitizen", "mepcitizen", "strategycitizen", "thinkcitizen"]
    for i, category in enumerate(Category.objects.all()):
        category.image = "profile_images/{img}.png".format(img=images[i % len(images)])
        categories.append(category)
    Category.objects.bulk_update(categories, ['image'])

def remove_private_bp():
    BigPicture.objects.filter(private=True).delete()

def delete_sessions():
    Session.objects.all().delete()

def delete_permissions():
    Permission.objects.all().delete()

class Command(BaseCommand):
    help = 'Generate fixtures to populate local dev environment database'

    def handle(self, *args, **options):
        anonymize_users()
        update_categories()
        remove_private_bp()
        delete_sessions()
        delete_permissions()
        call_command('dumpdata', exclude=['contenttypes'], natural_foreign=True, verbosity=1, output=FIXTURES_PATH)
        self.stdout.write(self.style.SUCCESS('Successfully generated fixtures'))
