import cloudinary.uploader
from ..models import Author
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete


@receiver(pre_save, sender=Author)
def auto_delete_image_on_update(sender, instance, **kwargs):
    """
    Deletes the old Cloudinary asset when an author's image is updated.
    """
    if not instance.pk:
        return  # New author, no asset to replace yet
    try:
        old_author = Author.objects.get(pk=instance.pk)
    except Author.DoesNotExist:
        return

    # Check if the author_image has been changed
    if old_author.author_image and old_author.author_image != instance.author_image:
        cloudinary.uploader.destroy(old_author.author_image.public_id)


@receiver(post_delete, sender=Author)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    """
    Deletes the asset from Cloudinary when the Author row is deleted.
    """
    if instance.author_image:
        cloudinary.uploader.destroy(instance.author_image.public_id)
