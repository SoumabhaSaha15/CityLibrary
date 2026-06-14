from ..models import Genre
from unfold.admin import ModelAdmin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ImportForm, ExportForm


@register(Genre)
class GenreAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
    search_fields = ('genre_name',)  # <-- Required for autocomplete
    list_display = ('genre_name', 'genre_description')

    list_per_page = 10
    list_max_show_all = 40
