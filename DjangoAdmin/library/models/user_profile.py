import os
from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    user_image = CloudinaryField("user_image", folder="city-library/user")

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def clean(self):
        super().clean()
        if self.user_image and hasattr(self.user_image, "name"):
            filename = self.user_image.name
            ext = os.path.splitext(filename)[1].lower()
            valid_extensions = [".jpg", ".jpeg", ".png", ".webp"]
            if ext not in valid_extensions:
                raise ValidationError(
                    {
                        "user_image": "Unsupported file type. Please upload a JPG, PNG, or WEBP image."
                    }
                )

    class Meta:
        db_table = "library_user_profiles"
