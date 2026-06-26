import cloudinary
from ..models import Author
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from django.contrib.admin import register, display
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ImportForm, ExportForm


@register(Author)
class AuthorAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
    list_display = ('author_id', 'author_name',
                    'image_preview', 'nationality', 'born_on')
    search_fields = ('author_name', 'nationality')
    list_filter = ('gender', 'nationality')
    readonly_fields = ('image_preview',)

    list_per_page = 10
    list_max_show_all = 40

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
                image_url, _ = cloudinary.utils.cloudinary_url(
                    obj.author_image.public_id,
                    width=200,
                    crop="fill",
                    secure=True
                )
                return format_html('<a href="{}" target="_blank"><img src="{}" width="200" /></a>', image_url, image_url)
            except Exception as e:
                return f"Error: {e}"
        return "(No Image)"
