from django.apps import AppConfig
from django.conf import settings
from django.contrib.sites.models import Site


class CoreappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'coreapp'

    def ready(self):
        if not settings.DEBUG:  # Only run in production
            try:
                site = Site.objects.get_or_create(pk=settings.SITE_ID)[0]
                site.domain = settings.SITE_DOMAIN
                site.name = settings.SITE_NAME
                site.save()
            except Exception as e:
                print(f"Warning: Could not update site domain: {e}")


                
