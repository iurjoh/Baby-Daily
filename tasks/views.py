from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwnerOrAdmin
from bd_backend.private_collections import OwnerScopedCollectionMixin
from .models import Task
from .serializers import TaskSerializer

class TaskList(OwnerScopedCollectionMixin, generics.ListCreateAPIView):
    """
    List tasks or create a task if logged in.
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend]
    

    filterset_fields = ['owner__username']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskDetail(OwnerScopedCollectionMixin, generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a task, or update or delete it by id if you own it.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
