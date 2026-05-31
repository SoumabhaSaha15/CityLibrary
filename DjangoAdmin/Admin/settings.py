"""
For more information on this file, see https://docs.djangoproject.com/en/5.2/topics/settings/
For the full list of settings and their values, see https://docs.djangoproject.com/en/5.2/ref/settings/
#auth-password-validators
Password validation https://docs.djangoproject.com/en/5.2/ref/settings/
Database https://docs.djangoproject.com/en/5.2/ref/settings/#databases
Static files (CSS, JavaScript, Images) https://docs.djangoproject.com/en/5.2/howto/static-files/
#default-auto-field
Default primary key field type https://docs.djangoproject.com/en/5.2/ref/settings/
Internationalization https://docs.djangoproject.com/en/5.2/topics/i18n/
"""

import os
import environ
import cloudinary
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")
ALLOWED_HOSTS = []
cloudinary.config(
    cloud_name=env("CLOUDINARY_NAME"),
    api_key=env("CLOUDINARY_KEY"),
    api_secret=env("CLOUDINARY_SECRET"),
)
DEFAULT_IMAGE_URL = env("DEFAULT_IMAGE_URL")
INSTALLED_APPS = [
    "unfold",
    "cloudinary",
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "rest_framework",
    "django_filters",
    "library",
]  # Application definition

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "Admin.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Admin.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

STATIC_ROOT = BASE_DIR / "staticfiles"  # STATIC_URL = '/static/'

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}  # WhiteNoise configuration

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
CORS_ALLOW_CREDENTIALS = True
# settings.py


UNFOLD = {
    "COLORS": {
        "base": {
            # Pure neutral gray (Chroma 0, Hue 0)
            "50": "oklch(98.5% 0 0)",
            "100": "oklch(96.7% 0 0)",
            "200": "oklch(92.8% 0 0)",
            "300": "oklch(87.2% 0 0)",
            "400": "oklch(70.7% 0 0)",
            "500": "oklch(55.1% 0 0)",
            "600": "oklch(44.6% 0 0)",
            "700": "oklch(37.3% 0 0)",
            "800": "oklch(27.8% 0 0)",
            "900": "oklch(21% 0 0)",
            "950": "oklch(13% 0 0)",
        },
        "primary": {
            # Pure neutral gray (Chroma 0, Hue 0)
            "50": "oklch(97.7% 0 0)",
            "100": "oklch(94.6% 0 0)",
            "200": "oklch(90.2% 0 0)",
            "300": "oklch(82.7% 0 0)",
            "400": "oklch(71.4% 0 0)",
            "500": "oklch(62.7% 0 0)",
            "600": "oklch(55.8% 0 0)",
            "700": "oklch(49.6% 0 0)",
            "800": "oklch(43.8% 0 0)",
            "900": "oklch(38.1% 0 0)",
            "950": "oklch(29.1% 0 0)",
        },
        "font": {
            "subtle-light": "var(--color-base-500)",
            "subtle-dark": "var(--color-base-400)",
            "default-light": "var(--color-base-600)",
            "default-dark": "var(--color-base-300)",
            "important-light": "var(--color-base-900)",
            "important-dark": "var(--color-base-100)",
        }
    }
}
