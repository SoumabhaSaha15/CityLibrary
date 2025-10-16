from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.utils import timezone


# Create your models here.
class Author(models.Model):
    GENDER_CHOICES = [
        ("m", "Male"),
        ("f", "Female"),
        ("t", "Transgender"),
        ("unknown", "Unknown"),
    ]

    authorId = models.AutoField(primary_key=True,name='author_id')
    authorImage = models.URLField(validators=[URLValidator(schemes=["https"])],db_column='author_image')
    authorDescription = models.CharField(max_length=256,db_column='author_description')
    authorName = models.CharField(max_length=64,db_column='author_name')
    bornOn = models.DateField(db_column='born_on')
    nationality = models.CharField(max_length=16, default="unknown")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="unknown")

    class Meta:
        db_table = "library_authors"
        constraints = [
            models.CheckConstraint(
                check=models.Q(gender__in=["m", "f", "t", "unknown"]),
                name="gender_check",
            ),
            models.CheckConstraint(
                check=models.Q(author_image__startswith="https://"),
                name="image_url_check",
            ),
            models.CheckConstraint(
                check=models.Q(born_on__lt=timezone.now().date()),
                name="dob_check",
                violation_error_message="Birth date must be in the past",
            ),
        ]

    def clean(self):
        """Additional validation at the model level"""
        super().clean()

        # Validate HTTPS URL
        if not self.author_image_url.startswith("https://"):
            raise ValidationError(
                {"author_image_url": "Image URL must start with https://"}
            )

        # Validate birth date is in the past
        if self.born_on >= timezone.now().date():
            raise ValidationError({"born_on": "Birth date must be in the past"})

    def save(self, *args, **kwargs):
        """Call clean() before saving"""
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.author_name
