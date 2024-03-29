from stat import FILE_ATTRIBUTE_SPARSE_FILE
from config.settings.dev import SECRET_KEY
from . base import *
import django_on_heroku
from decouple import config

SECRET_KEY = config('SECRET_KEY')

DEBUG = False

ALLOWED_HOSTS = [
    '*',
]


DEBUG_PROPAGATE_EXCEPTIONS = True

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'formatters': {
#         'verbose': {
#             'format' : '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s',
#             'datefmt' : '%d/%b/%Y %H:%M:%S'
#         },
#         'simple': {
#             'format': '%(levelname)s %(message)s'
#         },
#     },
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'arch': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         },
#     }
# }

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'main_format': {
            'format': '{asctime} - {levelname} - {module} - {filename} - {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'main_format',
        },
        'file': {
            'class': 'logging.FileHandler',
            'formatter': 'main_format',
            'filename': 'information.log',
        },
    },
    'loggers': {
        'main': {
            'handler': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        }
    }
}

# Heroku_Settings
django_on_heroku.settings(locals(), staticfiles=False)
del DATABASES['default']['OPTIONS']['sslmode']

