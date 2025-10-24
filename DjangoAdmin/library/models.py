import os
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    user_image = CloudinaryField("user_image", folder="city-library/user")

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def clean(self):
        super().clean()
        if self.user_image and hasattr(self.user_image, 'name'):
            filename = self.user_image.name
            ext = os.path.splitext(filename)[1].lower()
            valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
            if ext not in valid_extensions:
                raise ValidationError({
                    "user_image": "Unsupported file type. Please upload a JPG, PNG, or WEBP image."
                })

    class Meta:
        db_table = "library_user_profiles"


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
            # The file name is available on the 'name' attribute
            filename = self.author_image.name
            # Get the file extension and convert to lowercase
            ext = os.path.splitext(filename)[1].lower()
            # List of allowed extensions
            valid_extensions = ['.jpg', '.jpeg', '.png']
            if not ext in valid_extensions:
                raise ValidationError(
                    {"author_image": f"Unsupported file type. Please upload a JPG or PNG image."})
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

# class Books(models.Model):
