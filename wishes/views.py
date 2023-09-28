from rest_framework import generics, permissions
from .models import Wish
from .serializers import WishSerializer
from bd_backend.permissions import IsOwnerOrReadOnly

class WishListCreate(generics.ListCreateAPIView):
    serializer_class = WishSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wish.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class WishDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = WishSerializer

    def get_queryset(self):
        return Wish.objects.all()
