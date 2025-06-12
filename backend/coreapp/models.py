from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, URLValidator
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import EmailValidator

class SiteConfiguration(models.Model):
    """
    Singleton model to store site-wide banner video settings.
    """
    banner_video = models.FileField(
        upload_to='banner_videos/',
        blank=True,
        null=True,
        help_text="Upload the main banner video file (mp4, webm, etc.)."
    )
    # Add other global settings here if needed

    class Meta:
        verbose_name = "Banner Video"
        verbose_name_plural = "Banner Video"

    def __str__(self):
        return "Banner Video Settings"

    # Ensure only one instance of SiteConfiguration can be created
    def save(self, *args, **kwargs):
        if not self.pk and SiteConfiguration.objects.exists():
            raise ValidationError('There can be only one SiteConfiguration instance.')
        return super(SiteConfiguration, self).save(*args, **kwargs)


class FooterContent(models.Model):
    """
    Model to store footer content and social media links.
    """
    address = models.TextField(
        help_text="Institution's physical address",
        blank=True,
        null=True
    )
    email = models.EmailField(
        help_text="Contact email address",
        validators=[EmailValidator()],
        blank=True,
        null=True
    )
    phone = models.CharField(
        max_length=20,
        help_text="Contact phone number",
        blank=True,
        null=True
    )
    facebook_url = models.URLField(
        max_length=200,
        help_text="Facebook profile/page URL",
        blank=True,
        null=True,
        validators=[URLValidator()]
    )
    twitter_url = models.URLField(
        max_length=200,
        help_text="Twitter profile URL",
        blank=True,
        null=True,
        validators=[URLValidator()]
    )
    instagram_url = models.URLField(
        max_length=200,
        help_text="Instagram profile URL",
        blank=True,
        null=True,
        validators=[URLValidator()]
    )
    youtube_url = models.URLField(
        max_length=200,
        help_text="YouTube channel URL",
        blank=True,
        null=True,
        validators=[URLValidator()]
    )
    linkedin_url = models.URLField(
        max_length=200,
        help_text="LinkedIn profile/company URL",
        blank=True,
        null=True,
        validators=[URLValidator()]
    )
    about_text = models.TextField(
        help_text="Brief description about the institution for the footer",
        blank=True,
        null=True
    )
    copyright_text = models.CharField(
        max_length=255,
        default="© 2025 Robotics Institution. All rights reserved.",
        help_text="Copyright text to display in footer"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Enable/disable this footer configuration"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Footer Content"
        verbose_name_plural = "Footer Content"
        ordering = ['-is_active', '-created_at']

    def __str__(self):
        return f"Footer Configuration ({'Active' if self.is_active else 'Inactive'}) - Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')}"

    def save(self, *args, **kwargs):
        # Ensure only one active footer configuration exists
        if self.is_active:
            FooterContent.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

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
    Represents a specific competition or activity.
    """
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
    image_url = models.URLField(
        blank=True,
        null=True,
        help_text="URL of the image to display for this event"
    )

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


class Testimonial(models.Model):
    """
    Stores testimonials from participants, judges, or other stakeholders.
    """
    class Rating(models.IntegerChoices):
        ONE = 1, _('★☆☆☆☆')
        TWO = 2, _('★★☆☆☆')
        THREE = 3, _('★★★☆☆')
        FOUR = 4, _('★★★★☆')
        FIVE = 5, _('★★★★★')

    name = models.CharField(max_length=100, help_text="Name of the person giving the testimonial")
    role = models.CharField(max_length=100, help_text="Role/Position of the person (e.g., Team Captain, Judge, Participant)")
    event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='testimonials',
        help_text="Optional: Link to a specific event this testimonial is about"
    )
    content = models.TextField(help_text="The testimonial content")
    rating = models.PositiveSmallIntegerField(
        choices=Rating.choices,
        default=Rating.FIVE,
        help_text="Rating out of 5 stars"
    )
    is_approved = models.BooleanField(
        default=False,
        help_text="Set to True to display this testimonial publicly"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f"Testimonial from {self.name} ({self.get_rating_display()})"
