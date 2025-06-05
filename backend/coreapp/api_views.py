from rest_framework import viewsets, generics, response, status
from .models import Championship, Event, NewsUpdate, Team, TeamRank, SiteConfiguration, TeamMember, EventRegistration
from .serializers import (
    ChampionshipSerializer, EventSerializer, NewsUpdateSerializer,
    TeamSerializer, TeamRankSerializer, SiteConfigurationSerializer,
    TeamRegistrationSerializer, EventRegistrationSerializer
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Read-only ModelViewSets (for future use or admin)
class ChampionshipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Championship.objects.all()
    serializer_class = ChampionshipSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class NewsUpdateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsUpdate.objects.all()
    serializer_class = NewsUpdateSerializer

class TeamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamRankViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamRank.objects.all()
    serializer_class = TeamRankSerializer

class SiteConfigurationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteConfiguration.objects.all()
    serializer_class = SiteConfigurationSerializer


class RegisterTeamAPIView(APIView):
    permission_classes = []  # Open to all

    def post(self, request, *args, **kwargs):
        serializer = TeamRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            return response.Response(TeamRegistrationSerializer(team).data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventRegistrationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        team_id = request.data.get('team')
        event_id = request.data.get('event')
        if not team_id or not event_id:
            return response.Response({'detail': 'team and event are required.'}, status=status.HTTP_400_BAD_REQUEST)
        # Check user is a member of the team
        try:
            team_member = TeamMember.objects.get(user=user, team_id=team_id)
        except TeamMember.DoesNotExist:
            return response.Response({'detail': 'You are not a member of this team.'}, status=status.HTTP_403_FORBIDDEN)
        # Create event registration
        data = {'team': team_id, 'event': event_id}
        serializer = EventRegistrationSerializer(data=data)
        if serializer.is_valid():
            registration = serializer.save()
            return response.Response(EventRegistrationSerializer(registration).data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HomepageAPIView(generics.GenericAPIView):
    def get(self, request):
        # Fetch homepage data (customize as needed)
        site_config = SiteConfiguration.objects.first()
        championships = Championship.objects.filter(is_active=True)
        events = Event.objects.filter(display_in_navigation=True)
        news = NewsUpdate.objects.filter(is_published=True).order_by('-news_date')[:5]
        top_ranks = TeamRank.objects.order_by('rank', '-points_earned')[:10]

        return response.Response({
            'site_configuration': SiteConfigurationSerializer(site_config).data if site_config else None,
            'active_championships': ChampionshipSerializer(championships, many=True).data,
            'events': EventSerializer(events, many=True).data,
            'latest_news': NewsUpdateSerializer(news, many=True).data,
            'top_team_ranks': TeamRankSerializer(top_ranks, many=True).data,
        })
