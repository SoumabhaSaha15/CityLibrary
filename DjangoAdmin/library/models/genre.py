from django.db import models


class Genre(models.Model):
    genre_name = models.CharField(max_length=50, unique=True)
    genre_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.genre_name

    class Meta:
        db_table = "library_books_genre"
