import cloudinary.uploader
from ..models import UserProfile  # Adjust imports as needed
from django.dispatch import receiver
from django.db.models.signals import pre_save, pre_delete


@receiver(pre_delete, sender=UserProfile)
def auto_delete_profile_on_delete(sender, instance, **kwargs):
    """
    Deletes the image from Cloudinary when the UserProfile is deleted.
    (This also triggers if the parent User is deleted due to CASCADE).
    """
    if instance.user_image:
        cloudinary.uploader.destroy(instance.user_image.public_id)


@receiver(pre_save, sender=UserProfile)
def auto_delete_profile_on_update(sender, instance, **kwargs):
    """
    Deletes the old Cloudinary image when a user uploads a new one.
    """
    if not instance.pk:
        return  # Object is new, nothing to delete yet

    try:
        old_profile = UserProfile.objects.get(pk=instance.pk)
    except UserProfile.DoesNotExist:
        return

    # If the image has changed, destroy the old one on Cloudinary
    if old_profile.user_image and old_profile.user_image != instance.user_image:
        cloudinary.uploader.destroy(old_profile.user_image.public_id)
