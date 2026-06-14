import os
from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator


class Author(models.Model):
    """
    Stores information about a book author.
    This version uses the original field names converted to snake_case.
    """

    GENDER_CHOICES = [
        ("m", "Male"),
        ("f", "Female"),
        ("t", "Transgender"),
        ("unknown", "Unknown"),
    ]

    # Reinstated original field names with snake_case convention
    author_id = models.AutoField(primary_key=True)
    author_image: CloudinaryField = CloudinaryField(
        "author_image",
        folder="city-library/author",
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )
    author_description = models.CharField(max_length=256)
    author_name = models.CharField(max_length=64)
    born_on = models.DateField()
    nationality = models.CharField(max_length=16, default="unknown")
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICES, default="unknown")

    class Meta:  # The flawed and redundant database constraints have been removed.
        db_table = "library_authors"
        constraints = []
        ordering = ["author_id"]

    # Model-level validation. This is the correct place to check dynamic values like the current date.
    def clean(self):
        super().clean()
        if self.born_on and self.born_on >= timezone.now().date():
            raise ValidationError(
                {"born_on": "Birth date must be in the past."})

    # Override save to ensure all model validators run before hitting the database.
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    # Returns a human-readable representation of the author.
    def __str__(self):
        return self.author_name
