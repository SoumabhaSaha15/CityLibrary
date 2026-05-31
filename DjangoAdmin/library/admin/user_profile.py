import cloudinary
from ..models import UserProfile
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from django.contrib.auth.models import User
from django.contrib.admin import register, display


@register(UserProfile)
class UserProfileAdmin(ModelAdmin):
    # <-- Required for autocomplete
    search_fields = ('id', 'user_image', 'user__username', 'user__email')
    list_display = ('id', 'user__username',
                    'user__email', 'user_image_preview')
    readonly_fields = ('user_image_preview',)
    list_per_page = 10
    list_max_show_all = 40

    @display(description='User Image')
    def user_image_preview(self, obj):
        """Creates a thumbnail preview for the user's image in the admin."""
        if obj.user_image and hasattr(obj.user_image, 'public_id'):
            try:
                image_url, _ = cloudinary.utils.cloudinary_url(
                    obj.user_image.public_id,
                    width=100,
                    height=100,
                    crop="fill",
                    secure=True
                )
                return format_html('<img src="{}" width="100" height="100" />', image_url)
            except Exception as e:
                return f"Error: {e}"
        return "(No Image)"
