from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ( Championship, Event, NewsUpdate, Team, TeamRank, 
    SiteConfiguration, TeamMember, EventRegistration, Testimonial
)

class SiteConfigurationSerializer(serializers.ModelSerializer):
    banner_video = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = SiteConfiguration
        fields = '__all__'

class ChampionshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Championship
        fields = '__all__'

class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'slug', 'short_description', 'start_date', 'end_date', 'location']

class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class NewsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsUpdate
        fields = '__all__'

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TeamMemberSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(read_only=True)
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'email', 'role', 'phone', 'user']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TeamRegistrationSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'institution', 'members']

    def create(self, validated_data):
        members_data = validated_data.pop('members')
        team = Team.objects.create(**validated_data)
        for member_data in members_data:
            user = None
            email = member_data.get('email')
            name = member_data.get('name')
            # If email is provided, try to create or get a user
            if email:
                user, created = User.objects.get_or_create(username=email, defaults={
                    'email': email,
                    'first_name': name or '',
                })
                if created:
                    user.is_active = False  # Require activation
                    user.save()
                    # --- Invitation email logic ---
                    # Generate a password reset/activation link
                    # from django.contrib.auth.tokens import default_token_generator
                    # from django.urls import reverse
                    # token = default_token_generator.make_token(user)
                    # uid = urlsafe_base64_encode(force_bytes(user.pk))
                    # activation_link = f"https://your-frontend-domain.com/activate/{uid}/{token}/"
                    # Send activation_link via email to user.email
                    print(f"[Invitation] Send activation link to {user.email}")
            TeamMember.objects.create(team=team, user=user, **{k: v for k, v in member_data.items() if k not in ['user']})
        return team

class TeamRankSerializer(serializers.ModelSerializer):
    championship_id = serializers.PrimaryKeyRelatedField(source='championship', read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = TeamRank
        fields = [f.name for f in TeamRank._meta.fields if f.name != 'championship'] + ['championship_id', 'team']

class EventRegistrationSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    class Meta:
        model = EventRegistration
        fields = ['id', 'team', 'event', 'created_at']
        read_only_fields = ['created_at']


class TestimonialSerializer(serializers.ModelSerializer):
    """
    Serializer for the Testimonial model.
    """
    event = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        required=False,
        allow_null=True
    )
    event_name = serializers.CharField(source='event.name', read_only=True)
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)

    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'role', 'event', 'event_name', 'content', 'rating',
            'rating_display', 'is_approved', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate_rating(self, value):
        """Validate that rating is between 1 and 5."""
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value

    def create(self, validated_data):
        """Create a new testimonial."""
        # By default, new testimonials are not approved
        validated_data['is_approved'] = False
        return super().create(validated_data)


class PublicTestimonialSerializer(serializers.ModelSerializer):
    """
    Simplified serializer for public-facing API that only shows approved testimonials.
    """
    event_name = serializers.CharField(source='event.name', read_only=True)
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)

    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'role', 'event_name', 'content',
            'rating', 'rating_display', 'created_at'
        ]
        read_only_fields = fields
