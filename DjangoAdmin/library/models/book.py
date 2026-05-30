import os
import re
from .genre import Genre
from .author import Author
from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    book_name = models.CharField(max_length=256)
    book_cover = CloudinaryField(
        "book_cover", folder="city-library/books", null=True, blank=True)
    book_genre = models.ManyToManyField(Genre, related_name='books')
    book_description = models.TextField(blank=True)
    book_isbn = models.CharField(
        max_length=13,
        unique=True,
        help_text="A 10 or 13-digit ISBN. Hyphens are automatically removed."
    )
    book_language = models.CharField(max_length=32)
    published_on = models.DateField()
    # --- THIS IS THE CHANGE ---
    # Use ManyToManyField to link multiple authors
    authors = models.ManyToManyField(
        Author,
        related_name="books"
    )
    # ---

    class Meta:
        db_table = "library_books"
        ordering = ["book_id"]

    def clean(self):
        super().clean()
        if self.book_isbn:
            # Remove hyphens and convert 'x' to 'X' for ISBN-10
            cleaned_isbn = self.book_isbn.replace("-", "").upper()

            # Check for valid length
            if len(cleaned_isbn) not in (10, 13):
                raise ValidationError({
                    "isbn": "ISBN must be 10 or 13 characters long (after removing hyphens)."
                })

            # Check 10-digit format (9 digits + 1 digit or 'X')
            if len(cleaned_isbn) == 10:
                if not re.match(r'^\d{9}[\dX]$', cleaned_isbn):
                    raise ValidationError(
                        {"book_isbn": "Invalid ISBN-10 format."})

            # Check 13-digit format (all digits)
            if len(cleaned_isbn) == 13:
                if not re.match(r'^\d{13}$', cleaned_isbn):
                    raise ValidationError(
                        {"book_isbn": "Invalid ISBN-13 format. Must be all digits."})

            # Save the cleaned, hyphen-less version
            self.book_isbn = cleaned_isbn
        if self.book_cover and hasattr(self.book_cover, 'name'):
            filename = self.book_cover.name
            ext = os.path.splitext(filename)[1].lower()
            valid_extensions = [".jpg", ".jpeg", ".png"]
            if ext not in valid_extensions:
                raise ValidationError(
                    {"book_cover": "Unsupported file type. Please upload a JPG or PNG image."}
                )

        if self.published_on and self.published_on >= timezone.now().date():
            raise ValidationError(
                {"published_on": "Publication date must be in the past."}
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.book_name
