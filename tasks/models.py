from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Task(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(default=timezone.now)
    priority = models.CharField(max_length=255, default='medium')
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s task"
