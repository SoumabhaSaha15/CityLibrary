# import os
from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
# from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    user_image = CloudinaryField(
        "user_image",
        folder="city-library/user",
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"

    def clean(self):
        super().clean()

    class Meta:
        db_table = "library_user_profiles"
