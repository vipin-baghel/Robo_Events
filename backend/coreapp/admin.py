from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import SiteConfiguration, Championship, Event, NewsUpdate, Team, TeamRank, TeamMember
from .resources import (
    SiteConfigurationResource,
    ChampionshipResource,
    EventResource,
    NewsUpdateResource,
    TeamResource,
    TeamRankResource,
)

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(ImportExportModelAdmin):
    resource_class = SiteConfigurationResource
    def has_add_permission(self, request):
        # Only allow adding if no instance exists
        return not SiteConfiguration.objects.exists()

@admin.register(Championship)
class ChampionshipAdmin(ImportExportModelAdmin):
    resource_class = ChampionshipResource
    list_display = ("name", "start_date", "end_date", "is_active", "location")
    search_fields = ("name", "location")
    list_filter = ("is_active", "start_date")

@admin.register(Event)
class EventAdmin(ImportExportModelAdmin):
    resource_class = EventResource
    list_display = ("name", "championship", "slug", "display_in_navigation")
    search_fields = ("name", "slug")
    list_filter = ("championship", "display_in_navigation")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(NewsUpdate)
class NewsUpdateAdmin(ImportExportModelAdmin):
    resource_class = NewsUpdateResource
    list_display = ("title", "news_date", "is_published")
    search_fields = ("title",)
    list_filter = ("is_published", "news_date")
    date_hierarchy = "news_date"

@admin.register(Team)
class TeamAdmin(ImportExportModelAdmin):
    resource_class = TeamResource
    list_display = ("name", "institution")
    search_fields = ("name", "institution")

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'team', 'email', 'role', 'phone')
    search_fields = ('name', 'email', 'team__name')
    list_filter = ('role', 'team')

@admin.register(TeamRank)
class TeamRankAdmin(ImportExportModelAdmin):
    resource_class = TeamRankResource
    list_display = ("team", "championship", "rank", "points_earned")
    search_fields = ("team__name", "championship__name")
    list_filter = ("championship",)
