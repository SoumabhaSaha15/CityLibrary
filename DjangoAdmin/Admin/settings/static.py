from .base import BASE_DIR
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
# --- ADD THIS NEW SETTING ---
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
