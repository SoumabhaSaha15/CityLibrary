from rest_framework import permissions


class IsLibraryMembersGroup(permissions.BasePermission):
    """
    Allows access only to authenticated users who are in the 'LIBRARY_MEMBERS' group.
    """

    def has_permission(self, request, _):
        # 1. Ensure the user is actually logged in
        if not bool(request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser:
            return True
        # 2. Check if they belong to the specific group
        return request.user.groups.filter(name='LIBRARY_MEMBERS').exists()
