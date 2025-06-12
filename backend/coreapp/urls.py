from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    TeamRankViewSet, EventViewSet, NewsUpdateViewSet, SiteConfigurationViewSet, 
    ChampionshipViewSet, TestimonialViewSet, FooterViewSet
)

router = DefaultRouter()
# RESTful endpoints for frontend
router.register(r'top-team-ranks', TeamRankViewSet, basename='top-team-ranks')
router.register(r'events', EventViewSet, basename='events')  
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')
router.register(r'competitions', ChampionshipViewSet, basename='competitions')
router.register(r'banner-video', SiteConfigurationViewSet, basename='banner-video')  # Placeholder
router.register(r'news-updates', NewsUpdateViewSet, basename='news-updates')
router.register(r'footer', FooterViewSet, basename='footer')

urlpatterns = [
    path('', include(router.urls)),
]
