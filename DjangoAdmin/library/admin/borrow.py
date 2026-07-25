from django.utils import timezone
from unfold.admin import ModelAdmin
from ..models import Borrow, BookCopy
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
    autocomplete_fields = [
        'requested_book',
        # 'book_copy',
        'user'
    ]
    readonly_fields = ('borrow_id', 'requested_at', )
    list_per_page = 10
    list_max_show_all = 40

    fieldsets = (
        ("Borrow Core Info", {
            "fields": ('borrow_id', 'user', 'requested_book')
        }),
        ("Copy Assignment & Approval", {
            "fields": ('book_copy', 'approved_at',)
        }),
        ("Schedule & Return", {
            "fields": ('return_date', 'returned_at', 'return_condition')
        }),
        ("Metadata", {
            "fields": ('requested_at',)
        }),
    )

    def save_model(self, request, obj: Borrow, form, change):
        """Automatically sets approved_at to today's date when a copy is assigned."""
        if obj.book_copy and not obj.approved_at:
            obj.approved_at = timezone.now().date()
        super().save_model(request, obj, form, change)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """Filters book_copy queryset based on the selected requested_book."""
        if db_field.name == "book_copy":
            object_id = (
                request.resolver_match.kwargs.get("object_id")
                if request.resolver_match
                else None
            )
            # request.resolver_match.kwargs.get("object_id")
            if object_id:
                borrow = self.get_object(request, object_id)
                if borrow and borrow.requested_book_id:
                    kwargs["queryset"] = BookCopy.objects.filter(
                        book_id=borrow.requested_book_id,
                        book_copy_status=BookCopy.StatusChoices.AVAILABLE
                    )
            else:
                kwargs["queryset"] = BookCopy.objects.filter(
                    book_copy_status=BookCopy.StatusChoices.AVAILABLE
                )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_queryset(self, request):
        """Optimizes database queries for linked foreign keys."""
        return super().get_queryset(request).select_related(
            'requested_book',
            'book_copy',
            'user'
        )
