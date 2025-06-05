from import_export import resources
from .models import SiteConfiguration, Championship, Event, NewsUpdate, Team, TeamRank

class SiteConfigurationResource(resources.ModelResource):
    class Meta:
        model = SiteConfiguration

class ChampionshipResource(resources.ModelResource):
    class Meta:
        model = Championship

class EventResource(resources.ModelResource):
    class Meta:
        model = Event

class NewsUpdateResource(resources.ModelResource):
    class Meta:
        model = NewsUpdate

class TeamResource(resources.ModelResource):
    class Meta:
        model = Team

class TeamRankResource(resources.ModelResource):
    class Meta:
        model = TeamRank
