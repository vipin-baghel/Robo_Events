from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from coreapp.models import Team, TeamMember

class Command(BaseCommand):
    help = 'Create test users, teams, and team members for testing purposes.'

    def handle(self, *args, **options):
        # Create test users
        users_data = [
            {'username': 'alice', 'email': 'alice@example.com', 'password': 'testpass123', 'first_name': 'Alice'},
            {'username': 'bob', 'email': 'bob@example.com', 'password': 'testpass123', 'first_name': 'Bob'},
            {'username': 'carol', 'email': 'carol@example.com', 'password': 'testpass123', 'first_name': 'Carol'},
        ]
        users = []
        for udata in users_data:
            user, created = User.objects.get_or_create(username=udata['username'], defaults={
                'email': udata['email'],
                'first_name': udata['first_name'],
                'is_active': True
            })
            if created:
                user.set_password(udata['password'])
                user.save()
            users.append(user)
        # Create a team
        team, _ = Team.objects.get_or_create(name='Test Team', defaults={'institution': 'Test University'})
        # Create team members
        for user in users:
            TeamMember.objects.get_or_create(team=team, user=user, defaults={
                'name': user.first_name,
                'email': user.email,
                'role': 'Tester',
                'phone': '1234567890',
            })
        self.stdout.write(self.style.SUCCESS('Test users, team, and team members created.'))
