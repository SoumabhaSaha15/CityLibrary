import cloudinary
from ..models import Book
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from django.contrib.admin import register, display


@register(Book)
class BookAdmin(ModelAdmin):
    list_display = ('book_id', 'book_name', 'book_cover_preview',
                    'published_on', 'book_language', 'book_isbn')
    search_fields = ('book_name', 'book_isbn')
    list_filter = ('published_on', 'book_language', 'book_genre', 'authors')

    # This provides a search box for your ManyToManyFields.
    # It's much better than the default multi-select box.
    autocomplete_fields = ['authors', 'book_genre']

    readonly_fields = ('book_cover_preview',)

    list_per_page = 10

    list_max_show_all = 40
    # Organizes the edit page into clean sections
    fieldsets = (
        ("Book Details", {
            "fields": ('book_name', 'book_isbn', 'book_description', 'book_language', 'published_on')
        }),
        ("Cover Image", {
            "fields": ('book_cover', 'book_cover_preview')
        }),
        ("Relationships", {
            "fields": ('authors', 'book_genre')
        }),
    )

    @display(description='Cover')
    def book_cover_preview(self, obj):
        """Creates a thumbnail preview for the book cover in the admin."""
        if obj.book_cover and hasattr(obj.book_cover, 'public_id'):
            try:
                image_url, _ = cloudinary.utils.cloudinary_url(
                    obj.book_cover.public_id,
                    width=100,  # A bit smaller for a book cover
                    crop="fill",
                    secure=True
                )
                return format_html('<img src="{}" width="100" />', image_url)
            except Exception as e:
                return f"Error: {e}"
        return "(No Cover)"
