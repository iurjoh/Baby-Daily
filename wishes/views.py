from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwnerOrAdmin
from bd_backend.private_collections import OwnerScopedCollectionMixin
from .models import Wish
from .serializers import WishSerializer

class WishList(OwnerScopedCollectionMixin, generics.ListCreateAPIView):
    """
    List wishes or create a wish if logged in.
    """
    serializer_class = WishSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Wish.objects.all()
    filter_backends = [DjangoFilterBackend]

    filterset_fields = ['owner__username']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class WishDetail(OwnerScopedCollectionMixin, generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a wish, or update or delete it by id if you own it.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = WishSerializer
    queryset = Wish.objects.all()
