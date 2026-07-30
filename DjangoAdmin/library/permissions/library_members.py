from rest_framework import permissions
from rest_framework.request import Request


class IsLibraryMembersGroup(permissions.BasePermission):
    """
    Allows access only to authenticated users who are in the 'LIBRARY_MEMBERS' group.
    """

    def has_permission(self, request: Request, _):
        if not bool(request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser:
            return True
        return request.user.groups.filter(name='LIBRARY_MEMBERS').exists()
