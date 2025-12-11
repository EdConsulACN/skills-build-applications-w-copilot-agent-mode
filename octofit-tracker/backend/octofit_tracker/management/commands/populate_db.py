from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team(name='marvel', members=[])
        marvel.save()
        dc = Team(name='dc', members=[])
        dc.save()

        # Create users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='marvel'),
            User(email='captain@marvel.com', name='Captain America', team='marvel'),
            User(email='batman@dc.com', name='Batman', team='dc'),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='dc'),
        ]
        for user in users:
            user.save()
        # Assign members to teams
        marvel.members = [u.email for u in users if u.team == 'marvel']
        dc.members = [u.email for u in users if u.team == 'dc']
        marvel.save()
        dc.save()

        # Create activities
        Activity.objects.create(user='Iron Man', type='run', duration=30, date='2025-12-10')
        Activity.objects.create(user='Captain America', type='cycle', duration=45, date='2025-12-09')
        Activity.objects.create(user='Batman', type='swim', duration=25, date='2025-12-08')
        Activity.objects.create(user='Wonder Woman', type='yoga', duration=60, date='2025-12-07')

        # Create leaderboard
        Leaderboard.objects.create(team='marvel', points=150)
        Leaderboard.objects.create(team='dc', points=120)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Sprints', description='Run 5 sprints', difficulty='medium')
        Workout.objects.create(name='Deadlift', description='Deadlift 100kg', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
