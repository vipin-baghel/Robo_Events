from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from .models import SiteConfiguration, Championship, Event, NewsUpdate, Team, TeamRank, TeamMember, Testimonial, FooterContent
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
        
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of the banner video settings
        return False

@admin.register(Championship)
class ChampionshipAdmin(ImportExportModelAdmin):
    resource_class = ChampionshipResource
    list_display = ("name", "start_date", "end_date", "is_active", "location")
    search_fields = ("name", "location")
    list_filter = ("is_active", "start_date")

@admin.register(Event)
class EventAdmin(ImportExportModelAdmin):
    resource_class = EventResource
    list_display = ("name", "start_date", "end_date", "location", "organized_by", "display_in_navigation", "image_preview")
    search_fields = ("name", "slug", "location", "organized_by", "sponsored_by")
    list_filter = ("display_in_navigation", "start_date")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("image_preview",)
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'short_description', 'display_in_navigation', 'image_url', 'image_preview')
        }),
        ('Event Details', {
            'fields': ('start_date', 'end_date', 'location')
        }),
        ('Additional Information', {
            'classes': ('collapse',),
            'fields': ('rules_and_eligibility', 'organized_by', 'sponsored_by'),
        }),
    )
    
    def image_preview(self, obj):
        if obj.image_url:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />'.format(obj.image_url))
        return "No image"
    image_preview.short_description = 'Image Preview'

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


@admin.register(Testimonial)
class TestimonialAdmin(ImportExportModelAdmin):
    list_display = ('name', 'role', 'event', 'rating', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'rating', 'event', 'created_at')
    search_fields = ('name', 'role', 'content', 'event__name')
    list_editable = ('is_approved',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'role', 'event', 'content', 'rating', 'is_approved')
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )
