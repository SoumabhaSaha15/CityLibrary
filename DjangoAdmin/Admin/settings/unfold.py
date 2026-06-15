# from django.templatetags.static import staticfiles

# from DjangoAdmin.Admin.settings import static
from django.templatetags.static import static


UNFOLD = {
    "SITE_HEADER": "Admin Panel",
    # "SITE_ICON": "local_library",
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "type": "image/svg+xml",    # Use "image/x-icon" if using a .ico file
            # Path to your icon in your Django static folder
            "href": lambda request: static("admin.png"),
        },
    ],
    "COLORS": {
        "base": {
            # Pure neutral gray backgrounds and borders
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
            # Standard Blue Accent (Hue ~254)
            "50": "oklch(97% 0.014 254)",
            "100": "oklch(93% 0.034 254)",
            "200": "oklch(88% 0.058 254)",
            "300": "oklch(80% 0.105 254)",
            "400": "oklch(71% 0.165 254)",
            "500": "oklch(62% 0.214 254)",  # Main active color
            "600": "oklch(54% 0.214 254)",
            "700": "oklch(46% 0.184 254)",
            "800": "oklch(39% 0.144 254)",
            "900": "oklch(32% 0.114 254)",
            "950": "oklch(25% 0.084 254)",
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
