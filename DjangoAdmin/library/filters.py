# your_app/filters.py
from django_filters import rest_framework as filters
from .models import Author


class AuthorFilter(filters.FilterSet):
    # This creates a case-insensitive search for the author's name
    author_name = filters.CharFilter(
        field_name="author_name", lookup_expr="icontains")
    nationality = filters.CharFilter(
        field_name="nationality", lookup_expr="icontains")
    gender = filters.CharFilter(field_name="gender", lookup_expr="icontains")

    class Meta:
        model = Author
        # List all the fields you want to enable for filtering
        fields = ["author_name", "nationality", "gender"]
