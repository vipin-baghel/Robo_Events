from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.core.exceptions import ValidationError

class SiteConfiguration(models.Model):
    """
    Singleton model to store site-wide settings.
    """
    banner_video = models.FileField(
        upload_to='banner_videos/',
        blank=True,
        null=True,
        help_text="Upload the main banner video file (mp4, webm, etc.)."
    )
    # Add other global settings here if needed

    def __str__(self):
        return "Site Configuration"

    # Ensure only one instance of SiteConfiguration can be created
    def save(self, *args, **kwargs):
        if not self.pk and SiteConfiguration.objects.exists():
            raise ValidationError('There can be only one SiteConfiguration instance.')
        return super(SiteConfiguration, self).save(*args, **kwargs)

class Championship(models.Model):
    """
    Represents a major robotics championship or season.
    """
    name = models.CharField(max_length=200, help_text="e.g., RoboCup 2025, National Robotics League 2024")
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(
        default=False,
        help_text="Mark as active for the current/upcoming championship."
    )
    location  = models.CharField(max_length=200, blank=True, help_text="Location of the championship (e.g., University of Technology, Robotics Arena)")
    # Add other championship-specific details if needed (e.g., theme, location)

    def __str__(self):
        return f"{self.name} ({self.start_date.year})"

    class Meta:
        ordering = ['-start_date'] # Show newest championships first

class Event(models.Model):
    """
    Represents a specific competition or activity within a championship.
    """
    championship = models.ForeignKey(
        Championship,
        related_name='events',
        on_delete=models.SET_NULL, # Keep events even if championship is deleted, or use CASCADE
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100, unique=True, help_text="e.g., Robo Race, Line Follower, Robo Soccer")
    slug = models.SlugField(
        max_length=120,
        unique=True,
        help_text="URL-friendly version of the event name (auto-generated if possible)."
    )
    short_description = models.TextField(blank=True, help_text="A brief overview for listings.")
    start_date = models.DateField(help_text="Start date of the event", null=True, blank=True)
    end_date = models.DateField(help_text="End date of the event", null=True, blank=True)
    location = models.CharField(max_length=200, blank=True, help_text="Venue or location where the event will take place")
    rules_and_eligibility = models.TextField(blank=True, help_text="Detailed rules and eligibility criteria for the event")
    organized_by = models.CharField(max_length=200, blank=True, help_text="Organization or committee organizing the event")
    sponsored_by = models.CharField(max_length=200, blank=True, help_text="Sponsors of the event")
    display_in_navigation = models.BooleanField(default=True, help_text="Include this event in homepage navigation.")

    def __str__(self):
        return self.name

class NewsUpdate(models.Model):
    """
    Represents a news item or update.
    """
    title = models.CharField(max_length=250)
    news_date = models.DateTimeField(default=timezone.now)
    content = models.TextField(blank=True)
    image_url = models.URLField(
        blank=True,
        null=True,
        help_text="URL of the image accompanying the news update."
    )
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-news_date'] # Show newest news first

class Team(models.Model):
    """
    Represents a participating team.
    """
    name = models.CharField(max_length=150, unique=True)
    institution = models.CharField(max_length=200, blank=True, help_text="School, University, or Organization")
    # Add other team details: logo, members, etc.

    def __str__(self):
        return self.name

from django.contrib.auth.models import User

class TeamMember(models.Model):
    """
    Represents a member of a team. Linked to a Django User for authentication.
    """
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL, help_text="Linked Django user for login/authentication.")
    team = models.ForeignKey(Team, related_name='members', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    role = models.CharField(max_length=50, blank=True)  # e.g., Leader, Programmer, etc.
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.name} ({self.team.name})"

class TeamRank(models.Model):
    """
    Stores ranking information for teams, potentially per championship or overall.
    """
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='rankings')
    championship = models.ForeignKey(
        Championship,
        on_delete=models.CASCADE,
        related_name='rankings',
        null=True, blank=True, # For overall ranking vs championship-specific
        help_text="Link to a specific championship if ranks are per championship."
    )
    rank = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Overall or championship-specific rank."
    )
    points_earned = models.PositiveIntegerField(default=0)
    video_url_1 = models.URLField(blank=True, null=True, help_text="Primary video URL for this ranked team (e.g., performance highlight).")
    video_url_2 = models.URLField(blank=True, null=True, help_text="Secondary video URL for this ranked team.")

    def __str__(self):
        return f"Rank {self.rank}: {self.team.name} ({self.points_earned} points)"

    class Meta:
        ordering = ['rank', '-points_earned'] # Order by rank, then by points
        unique_together = [['team', 'championship']] # A team can have one rank per championship

class EventRegistration(models.Model):
    """
    Represents a registration of a team for an event.
    """
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='event_registrations')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['team', 'event']]
        verbose_name = 'Event Registration'
        verbose_name_plural = 'Event Registrations'

    def __str__(self):
        return f"{self.team.name} registered for {self.event.name}"
