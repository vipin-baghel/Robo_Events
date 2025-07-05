from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from coreapp.models import (
    Championship, Event, Testimonial, Team, TeamMember, TeamRank, NewsUpdate, SiteConfiguration, FooterContent
)
from django.utils import timezone
import random
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Load initial test data into the database'

    def handle(self, *args, **options):
        self.stdout.write('Loading test data...')
        
        # Create Site Configuration if it doesn't exist
        # site_config, created = SiteConfiguration.objects.get_or_create(
        #     defaults={
        #         'banner_video': 'banner_videos/sample_banner.mp4'
        #     }
        # )
        
        # Create a test championship
        championship = Championship.objects.create(
            name="RoboChampionship 2025",
            start_date=timezone.now().date() + timedelta(days=30),
            end_date=timezone.now().date() + timedelta(days=60),
            is_active=True,
            location="Tech Convention Center, Bangalore",
            image=None
        )
        
        # Create detailed events
        events = []
        event_data = [
            {
                'name': 'Robo Race',
                'short_description': 'High-speed autonomous robot racing competition',
                'rules_and_eligibility': 'Robots must be fully autonomous. Maximum dimensions: 25x25x25cm. Weight limit: 2.5kg.',
                'organized_by': 'Robotics Association of India',
                'sponsored_by': 'TechCorp & Future Robotics',
                'image_url': 'https://picsum.photos/seed/roborace/800/600'
            },
            {
                'name': 'Line Follower',
                'short_description': 'Robots race to follow a line with complex patterns',
                'rules_and_eligibility': 'Line width: 2cm. Maximum robot dimensions: 20x20x20cm. Must complete 3 laps.',
                'organized_by': 'Indian Institute of Robotics',
                'sponsored_by': 'CircuitMasters Inc.',
                'image_url': 'https://picsum.photos/seed/linefollower/800/600'
            },
            {
                'name': 'Robo Soccer',
                'short_description': '2v2 robot soccer matches with an electronic ball',
                'rules_and_eligibility': 'Teams of 2 robots. Maximum robot dimensions: 15x15x15cm. 5-minute matches.',
                'organized_by': 'Sports Robotics Federation',
                'sponsored_by': 'SoccerTech & RoboPlay',
                'image_url': 'https://picsum.photos/seed/robosoccer/800/600'
            },
            {
                'name': 'Sumo Wrestling',
                'short_description': 'Robots compete to push each other out of the ring',
                'rules_and_eligibility': 'Maximum weight: 3kg. Robot must fit in 20x20cm square. First to 2 points wins.',
                'organized_by': 'RoboSumo Association',
                'sponsored_by': 'SumoTech & BattleBots',
                'image_url': 'https://picsum.photos/seed/robosumo/800/600'
            },
            {
                'name': 'Drone Racing',
                'short_description': 'FPV drone racing through challenging obstacle courses',
                'rules_and_eligibility': 'Maximum diagonal size: 250mm. Must use approved FPV equipment. 3-lap qualifying.',
                'organized_by': 'Aero Robotics Club',
                'sponsored_by': 'SkyTech & DroneMasters',
                'image_url': 'https://picsum.photos/seed/dronerace/800/600'
            }
        ]
        
        # Calculate event dates (spread out over next 2 months)
        base_date = timezone.now() + timedelta(days=7)  # Start a week from now
        
        for i, event_info in enumerate(event_data):
            start_date = base_date + timedelta(weeks=i*2)
            event, created = Event.objects.get_or_create(
                name=event_info['name'],
                defaults={
                    'short_description': event_info['short_description'],
                    'start_date': start_date,
                    'end_date': start_date + timedelta(days=2),  # 2-day events
                    'location': "Tech Convention Center, Bangalore",
                    'rules_and_eligibility': event_info['rules_and_eligibility'],
                    'organized_by': event_info['organized_by'],
                    'sponsored_by': event_info['sponsored_by'],
                    'display_in_navigation': True,
                    'slug': event_info['name'].lower().replace(' ', '-'),
                    'image_url': event_info['image_url']
                }
            )
            
            if not created:
                # Update existing event with new data
                for field, value in event_info.items():
                    setattr(event, field, value)
                event.start_date = start_date
                event.end_date = start_date + timedelta(days=2)
                event.save()
                
            events.append(event)
        
        # Create some teams
        teams = []
        team_data = [
            ("Tech Titans", "Indian Institute of Technology"),
            ("Robo Masters", "National Institute of Technology"),
            ("Circuit Breakers", "Birla Institute of Technology"),
            ("Byte Force", "Delhi Technological University"),
            ("Quantum Bots", "Indian Institute of Science")
        ]
        
        for name, institution in team_data:
            team = Team.objects.create(
                name=name,
                institution=institution
            )
            teams.append(team)
        
        # Create team members
        for team in teams:
            for i in range(1, 4):  # 3 members per team
                TeamMember.objects.create(
                    team=team,
                    name=f"Member {i} {team.name}",
                    email=f"member{i}.{team.name.lower().replace(' ', '')}@example.com",
                    role="Member" if i > 1 else "Team Leader"
                )
        
        # Create team ranks
        for i, team in enumerate(teams, 1):
            TeamRank.objects.create(
                team=team,
                championship=championship,
                rank=i,
                points_earned=100 - (i * 10),
                video_url_1=f"https://example.com/videos/team{team.id}_1.mp4"
            )
        
        # Create news updates with unique images
        news_data = [
            ("RoboChampionship 2025 Registration Now Open!", "https://picsum.photos/seed/robo1/800/400"),
            ("New Robotics Workshop Announced for Participants", "https://picsum.photos/seed/robo2/800/400"),
            ("Meet the Teams: Tech Titans Lead the Competition", "https://picsum.photos/seed/robo3/800/400"),
            ("Day 1 Highlights: Exciting Matches and Close Calls", "https://picsum.photos/seed/robo4/800/400")
        ]
        
        for i, (title, image_url) in enumerate(news_data):
            NewsUpdate.objects.get_or_create(
                title=title,
                defaults={
                    'news_date': timezone.now() - timedelta(days=len(news_data) - i),
                    'content': f"This is a detailed news article about {title.lower()}",
                    'image_url': image_url,
                    'is_published': True
                }
            )
        
        # Create testimonials
        testimonial_data = [
            ("John Doe", "Team Leader, Tech Titans", 5, "An amazing experience! The competition was well-organized and challenging."),
            ("Jane Smith", "Judge", 4, "Impressed by the talent and innovation on display. Looking forward to next year!"),
            ("Alex Johnson", "Participant", 5, "Best robotics competition I've been part of. Learned so much!"),
            ("Sarah Williams", "Spectator", 5, "The events were thrilling. Can't wait to participate next year!"),
            ("Mike Brown", "Mentor", 4, "Great platform for young engineers to showcase their skills.")
        ]
        
        for i, (name, role, rating, content) in enumerate(testimonial_data):
            # Only create if a testimonial with this name and event doesn't exist
            event = events[i % len(events)]
            testimonial, created = Testimonial.objects.get_or_create(
                name=name,
                event=event,
                defaults={
                    'role': role,
                    'content': content,
                    'rating': rating,
                    'is_approved': True
                }
            )
            
        
        # Create a superuser if none exists
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='admin'
            )
            self.stdout.write(self.style.SUCCESS('Created superuser: admin / admin'))
        
        # Create footer content if it doesn't exist
        if not FooterContent.objects.exists():
            footer = FooterContent.objects.create(
                address="123 Robotics Avenue\nTech Park, Electronic City\nBangalore, Karnataka 560100\nIndia",
                email="contact@roboticsinstitute.edu.in",
                phone="+91 80 1234 5678",
                facebook_url="https://facebook.com/roboticsinstitute",
                twitter_url="https://twitter.com/robotics_inst",
                instagram_url="https://instagram.com/roboticsinstitute",
                youtube_url="https://youtube.com/c/roboticsinstitute",
                linkedin_url="https://linkedin.com/company/robotics-institute",
                about_text="The Robotics Institute is a premier institution dedicated to advancing robotics education and research. We organize national and international robotics competitions to foster innovation and technical excellence among students and professionals.",
                copyright_text="© 2025 Robotics Institute. All rights reserved.",
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS('Created sample footer content'))

        self.stdout.write(self.style.SUCCESS('Successfully loaded test data!'))
