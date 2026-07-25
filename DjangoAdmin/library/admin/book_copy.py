from ..models import BookCopy
from unfold.admin import ModelAdmin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin
from django.contrib.admin import RelatedOnlyFieldListFilter
from unfold.contrib.import_export.forms import ImportForm, ExportForm


@register(BookCopy)
class BookCopyAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm

    list_display = (
        'book_copy_id',
        'book',
        'book_copy_status',
        'book_copy_condition',
        'added_at',
    )
    search_fields = (
        'book_copy_id',
        'book__book_name',
        'book__book_isbn',
    )
    list_filter = (
        'book_copy_status',
        'book_copy_condition',
        ('book', RelatedOnlyFieldListFilter),
    )
    autocomplete_fields = ['book']
    readonly_fields = ('book_copy_id', 'added_at')
    list_per_page = 10
    list_max_show_all = 40

    fieldsets = (
        ("Copy Information", {
            "fields": ('book_copy_id', 'book')
        }),
        ("Status & Condition", {
            "fields": ('book_copy_status', 'book_copy_condition')
        }),
        ("Metadata", {
            "fields": ('added_at',)
        }),
    )

    def get_queryset(self, request):
        """Optimizes queries to prevent N+1 issues when displaying related books."""
        return super().get_queryset(request).select_related('book')
