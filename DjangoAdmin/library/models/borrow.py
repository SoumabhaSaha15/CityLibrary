import uuid
from .book import Book
from django.db import models
from .book_copy import BookCopy
from django.utils import timezone
from django.contrib.auth.models import User


class Borrow(models.Model):

    class ReturnConditionChoices(models.TextChoices):
        FAIR = "FAIR", "Book returned in fair condition"
        DAMAGED = "DAMAGED", "Book damaged on return"
        LOST = "LOST", "Book lost not returned"

    borrow_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique borrow id"
    )
    requested_book = models.ForeignKey(
        Book,
        on_delete=models.RESTRICT,
        related_name="borrow_requests"
    )
    book_copy = models.ForeignKey(
        BookCopy,
        null=True,
        blank=True,
        on_delete=models.RESTRICT,
        related_name="borrows"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.RESTRICT,
        related_name="borrows"
    )
    # Changed: Removed default="FAIR" and allowed null/blank since the book isn't returned yet
    return_condition = models.CharField(
        max_length=32,
        choices=ReturnConditionChoices.choices,
        null=True,
        blank=True,
        db_index=True
    )
    requested_at = models.DateField(auto_now_add=True)
    approved_at = models.DateField(null=True, blank=True)
    return_date = models.DateField()  # User-defined expected return date
    # Changed: Fixed typo from return_filed
    returned_at = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "library_borrow"

    def save(self, *args, **kwargs):
        # Automatically set approved_at to today when a copy is assigned
        if self.book_copy and not self.approved_at:
            self.approved_at = timezone.now().date()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.requested_book.book_name} ({self.borrow_id})"
