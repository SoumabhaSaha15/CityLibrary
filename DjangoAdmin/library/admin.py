from django.contrib.admin import register, site, display
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from . models import Author, Book, Genre
import cloudinary

site.unregister(User)


@register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm


@register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = ('author_id', 'author_name',
                    'image_preview', 'nationality', 'born_on')
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
                image_url, _ = cloudinary.utils.cloudinary_url(
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


@register(Genre)
class GenreAdmin(ModelAdmin):
    search_fields = ('genre_name',)  # <-- Required for autocomplete
    list_display = ('genre_name', 'genre_description')


@register(Book)
class BookAdmin(ModelAdmin):
    list_display = ('book_name', 'book_cover_preview',
                    'published_on', 'book_language')
    search_fields = ('book_name',)
    list_filter = ('published_on', 'book_language', 'book_genre', 'authors')

    # This provides a search box for your ManyToManyFields.
    # It's much better than the default multi-select box.
    autocomplete_fields = ['authors', 'book_genre']

    readonly_fields = ('book_cover_preview',)

    # Organizes the edit page into clean sections
    fieldsets = (
        ("Book Details", {
            "fields": ('book_name', 'book_description', 'book_language', 'published_on')
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
