from ..models import Borrow
from django.utils import timezone
from rest_framework import serializers


class BorrowSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Borrow
        fields = [
            "borrow_id",
            "user",
            "requested_book",
            "book_copy",
            "requested_at",
            "approved_at",
            "return_date",
            "returned_at",
            "return_condition",
        ]
        read_only_fields = [
            "borrow_id",
            "book_copy",
            "requested_at",
            "approved_at",
            "returned_at",
            "return_condition",
        ]

    def validate_return_date(self, value):
        if value <= timezone.now().date():
            raise serializers.ValidationError(
                "Return date must be in the future.")
        return value
