from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
import cloudinary.uploader
from ..models import Book  # Adjust import based on where this file lives

# Trigger 1: Delete image from Cloudinary when the Book model is deleted


@receiver(post_delete, sender=Book)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    """
    Deletes file from Cloudinary when corresponding `Book` object is deleted.
    """
    if instance.book_cover:
        cloudinary.uploader.destroy(instance.book_cover.public_id)

# Trigger 2: Delete old image when the Book cover is updated


@receiver(pre_save, sender=Book)
def auto_delete_image_on_change(sender, instance, **kwargs):
    """
    Deletes old file from Cloudinary when corresponding `Book` object is updated
    with a new file.
    """
    if not instance.pk:
        # The object is being created, not updated. Nothing to delete yet.
        return False

    try:
        # Fetch the old instance from the database
        old_book = Book.objects.get(pk=instance.pk)
        old_cover = old_book.book_cover
    except Book.DoesNotExist:
        return False

    new_cover = instance.book_cover

    # If an old cover exists and it doesn't match the new cover, destroy the old one
    if old_cover and old_cover != new_cover:
        cloudinary.uploader.destroy(old_cover.public_id)
