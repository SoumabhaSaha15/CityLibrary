from django.contrib.admin import register, site,display
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from . models import Author
import cloudinary

site.unregister(User)
@register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
@register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = ('author_id','author_name', 'image_preview', 'nationality', 'born_on')
    search_fields = ('author_name', 'nationality')
    list_filter = ('gender', 'nationality')
    readonly_fields = ('image_preview',)

    fieldsets = (
        ("Author Information", {
            "fields": ('author_name', 'author_description', 'image_preview', 'author_image'),
        }),
        ("Biographical Details", {
            "fields": ('born_on', 'nationality', 'gender'),
        }),
    )

    @display(description='Image Preview')
    def image_preview(self, obj):
        """
        Creates a thumbnail preview of the image in the admin.
        """
        # The author_image field holds a CloudinaryResource object.
        # We must check it exists and has a public_id.
        if obj.author_image and hasattr(obj.author_image, 'public_id'):
            try:
                # FIX: Pass the .public_id string, not the whole object
                image_url, options = cloudinary.utils.cloudinary_url(
                    obj.author_image.public_id,
                    width=150,
                    height=150,
                    crop="fill",
                    secure=True
                )
                return format_html('<a href="{}" target="_blank"><img src="{}" width="150" /></a>', image_url, image_url)
            except Exception as e:
                return f"Error: {e}"
        return "(No Image)"