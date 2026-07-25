import uuid
from .book import Book
from django.db import models


class BookCopy(models.Model):

    class StatusChoices(models.TextChoices):
        AVAILABLE = "AVAILABLE", "Available"
        BORROWED = "BORROWED", "Borrowed"
        MAINTENANCE = "MAINTENANCE", "In Maintenance"
        LOST = "LOST", "Lost"

    class ConditionChoices(models.TextChoices):
        NEW = "NEW", "New"
        GOOD = "GOOD", "Good"
        DAMAGED = "DAMAGED", "Damaged"

    book_copy_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique UUID barcode for this physical copy"
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.RESTRICT,
        related_name="copies"
    )
    book_copy_status = models.CharField(
        max_length=16,
        choices=StatusChoices.choices,
        default=StatusChoices.AVAILABLE,
        db_index=True
    )
    book_copy_condition = models.CharField(
        max_length=16,
        choices=ConditionChoices.choices,
        default=ConditionChoices.NEW,
        db_index=True
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "library_book_copies"
        ordering = ["-added_at"]
        verbose_name = "Book Copy"          # Singular name in admin UI
        verbose_name_plural = "Book Copies"  # Fixes "Book copys" -> "Book Copies"

    def __str__(self):
        # Using getattr fallback or choice label resolves static analysis/type checker errors
        status_label = self.StatusChoices(self.book_copy_status).label
        return f"{self.book.book_name} ({status_label}) - {self.book_copy_id}"
