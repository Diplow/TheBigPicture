from django.core.management import call_command
from django.core.management.base import BaseCommand


FIXTURES_PATH = 'api/management/fixtures.json'
DEFAULT_USERNAME = 'Diplomate'
DEFAULT_PASSWORD = 'vde'


class Command(BaseCommand):
    help = 'Flush database and load fixtures to populate local dev environment database'

    def handle(self, *args, **options):
        call_command('flush', interactive=True, verbosity=1)
        self.stdout.write(self.style.SUCCESS('Successfully flushed database'))

        call_command('loaddata', FIXTURES_PATH, verbosity=1)
        self.stdout.write(self.style.SUCCESS('Successfully loaded fixtures'))

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('You can log in with:'))
        self.stdout.write(self.style.SUCCESS(f'Username: {DEFAULT_USERNAME}'))
        self.stdout.write(self.style.SUCCESS(f'Password: {DEFAULT_PASSWORD}'))
