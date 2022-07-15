from django.apps import AppConfig


class ArchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'arch'

    def ready(self):
        import arch.signals

