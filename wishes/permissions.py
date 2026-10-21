from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    """All detail operations, including reads, require the owner or staff."""
    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and
                    (request.user.is_staff or obj.owner_id == request.user.pk))
