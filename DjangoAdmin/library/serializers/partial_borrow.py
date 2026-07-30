from ..models import Borrow
from rest_framework import serializers


class PartialBorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = ["borrow_id", "book_copy", "returned_at"]
