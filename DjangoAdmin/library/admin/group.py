from unfold.admin import ModelAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin as DefaultGroupAdmin
from django.contrib.admin import register, site

site.unregister(Group)


@register(Group)
class GroupAdmin(DefaultGroupAdmin, ModelAdmin):
    pass
