from ..models import Genre
from unfold.admin import ModelAdmin
from django.contrib.admin import register


@register(Genre)
class GenreAdmin(ModelAdmin):
    search_fields = ('genre_name',)  # <-- Required for autocomplete
    list_display = ('genre_name', 'genre_description')
