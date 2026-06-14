import cloudinary
from .base import env

cloudinary.config(
    cloud_name=env("CLOUDINARY_NAME"),
    api_key=env("CLOUDINARY_KEY"),
    api_secret=env("CLOUDINARY_SECRET"),
)
