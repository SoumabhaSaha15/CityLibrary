import cloudinary
from django.db import transaction
from ..forms import BookAdminForm
from unfold.admin import ModelAdmin
from ..models import Book, BookCopy
from django.utils.html import format_html
from django.contrib.admin import register, display
from import_export.admin import ImportExportModelAdmin
from django.contrib.admin import RelatedOnlyFieldListFilter
from unfold.contrib.import_export.forms import ImportForm, ExportForm


@register(Book)
class BookAdmin(ModelAdmin, ImportExportModelAdmin):
    form = BookAdminForm
    import_form_class = ImportForm
    export_form_class = ExportForm
    list_display = ('book_id', 'book_name', 'book_cover_preview',
                    'published_on', 'book_language', 'book_isbn')
    search_fields = ('book_name', 'book_isbn', 'authors__author_name')
    list_filter = ('published_on', 'book_language',
                   ('book_genre', RelatedOnlyFieldListFilter))

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
        ("Automate Inventory", {
            "fields": ('number_of_copies',),
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
                    width=200,  # A bit smaller for a book cover
                    crop="fill",
                    secure=True
                )
                return format_html('<img src="{}" class="w-40 h-40 object-cover rounded border border-base-300" />', image_url)
            except Exception as e:
                return f"Error: {e}"
        return "(No Cover)"

    def save_model(self, request, obj, form, change):
        # 1. First, save the actual Book record to get an ID in the database
        super().save_model(request, obj, form, change)

        # 2. Extract how many copies the user typed into the form
        copies_to_create = form.cleaned_data.get('number_of_copies')

        # 3. Intercept the flow and bulk-create physical BookCopy records automatically
        if copies_to_create:
            new_copies = [
                BookCopy(
                    book=obj,
                    book_copy_status=BookCopy.StatusChoices.AVAILABLE,
                    book_copy_condition=BookCopy.ConditionChoices.NEW,
                )
                for _ in range(copies_to_create)
            ]
            with transaction.atomic():
                BookCopy.objects.bulk_create(new_copies)
