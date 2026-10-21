"""Owner-scoped querysets for private task and wish collections."""
class OwnerScopedCollectionMixin:
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            return queryset.none()
        if user.is_staff:
            return queryset
        return queryset.filter(owner=user)
