from ..models import Borrow
from unfold.admin import ModelAdmin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin
from django.contrib.admin import RelatedOnlyFieldListFilter
from unfold.contrib.import_export.forms import ImportForm, ExportForm


@register(Borrow)
class BorrowAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm

    list_display = (
        'borrow_id',
        'user',
        'requested_book',
        'book_copy',
        'requested_at',
        'return_date',
        'approved_at',
        'returned_at',
    )
    search_fields = (
        'borrow_id',
        'user__username',
        'user__email',
        'requested_book__book_name',
        'book_copy__book_copy_id',
    )
    list_filter = (
        'return_condition',
        ('requested_book', RelatedOnlyFieldListFilter),
        ('user', RelatedOnlyFieldListFilter),
    )
    autocomplete_fields = ['requested_book', 'book_copy', 'user']
    readonly_fields = ('borrow_id', 'requested_at')
    list_per_page = 10
    list_max_show_all = 40

    fieldsets = (
        ("Borrow Core Info", {
            "fields": ('borrow_id', 'user', 'requested_book')
        }),
        ("Copy Assignment & Approval", {
            "fields": ('book_copy', 'approved_at')
        }),
        ("Schedule & Return", {
            "fields": ('return_date', 'returned_at', 'return_condition')
        }),
        ("Metadata", {
            "fields": ('requested_at',)
        }),
    )

    def get_queryset(self, request):
        """Optimizes database queries for linked foreign keys."""
        return super().get_queryset(request).select_related(
            'requested_book',
            'book_copy',
            'user'
        )
