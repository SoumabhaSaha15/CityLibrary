from ..models import Author
from rest_framework import serializers


class MinimalAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('author_name', 'author_id')
