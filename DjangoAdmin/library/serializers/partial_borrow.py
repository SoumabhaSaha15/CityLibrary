from rest_framework import serializers
from ..models import Borrow


class PartialBorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = ["borrow_id", "book_copy", "returned_at"]
