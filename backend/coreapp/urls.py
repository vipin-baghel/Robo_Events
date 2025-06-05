from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    HomepageAPIView, RegisterTeamAPIView, EventRegistrationAPIView,
    TeamRankViewSet, EventViewSet, NewsUpdateViewSet, SiteConfigurationViewSet, ChampionshipViewSet
)

router = DefaultRouter()
# RESTful endpoints for frontend
router.register(r'top-team-ranks', TeamRankViewSet, basename='top-team-ranks')
router.register(r'events', EventViewSet, basename='events')
router.register(r'featured-news', NewsUpdateViewSet, basename='featured-news')
router.register(r'testimonials', NewsUpdateViewSet, basename='testimonials')  # Placeholder: use correct ViewSet if exists
router.register(r'competitions', ChampionshipViewSet, basename='competitions')
router.register(r'banner-video', SiteConfigurationViewSet, basename='banner-video')  # Placeholder
router.register(r'news-updates', NewsUpdateViewSet, basename='news-updates')

urlpatterns = [
    # path('homepage/', HomepageAPIView.as_view(), name='homepage-api'),
    # path('register-team/', RegisterTeamAPIView.as_view(), name='register-team'),
    # path('event-registration/', EventRegistrationAPIView.as_view(), name='event-registration'),
    path('', include(router.urls)),
]
