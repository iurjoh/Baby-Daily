from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from bd_backend.permissions import IsOwnerOrReadOnly
from .models import Task
from .serializers import TaskSerializer

class TaskList(generics.ListCreateAPIView):
    """
    List tasks or create a task if logged in.
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend]
    
    # Use 'owner__username' to filter by the owner's username
    filterset_fields = ['owner__username']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a task, or update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
