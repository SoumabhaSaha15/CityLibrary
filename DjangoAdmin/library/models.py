from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from cloudinary.models import CloudinaryField
import os

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
    author_image = CloudinaryField(
        "author_image", folder="city-library/author")
    author_description = models.CharField(max_length=256)
    author_name = models.CharField(max_length=64)
    born_on = models.DateField()
    nationality = models.CharField(max_length=16, default="unknown")
    gender = models.CharField(
        max_length=10, choices=GENDER_CHOICES, default="unknown")

    class Meta:  # The flawed and redundant database constraints have been removed.
        db_table = "library_authors"
        constraints = []

    # Model-level validation. This is the correct place to check dynamic values like the current date.
    def clean(self):
        super().clean()
        if self.author_image:
            filename = self.author_image.name # The file name is available on the 'name' attribute
            ext = os.path.splitext(filename)[1].lower() # Get the file extension and convert to lowercase
            valid_extensions = ['.jpg', '.jpeg', '.png']  # List of allowed extensions
            if not ext in valid_extensions:
                raise ValidationError({"author_image": f"Unsupported file type. Please upload a JPG or PNG image."})
        if self.born_on and self.born_on >= timezone.now().date():
            raise ValidationError({"born_on": "Birth date must be in the past."})

    # Override save to ensure all model validators run before hitting the database.
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    # Returns a human-readable representation of the author.
    def __str__(self):
        return self.author_name

# class Books(models.Model):
