"""Read-only inventory. This command has no delete/apply option."""
import json
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

# Exact names observed in the public demo on 2026-10-21, not a prefix match.
CANDIDATES = (
    'qa_owner_demo', 'qa_visitor_demo', 'qa_adv_owner', 'qa_adv_visitor',
    'qa_adv_owner2_3a16', 'qa_adv_visitor2_3a16',
    'qa_adv_owner2_6fac', 'qa_adv_visitor2_6fac',
)


class Command(BaseCommand):
    help = 'Read-only dry-run inventory of eight known QA accounts; never deletes.'

    def handle(self, *args, **options):
        from posts.models import Post
        from comments.models import Comment
        from likes.models import Like
        from followers.models import Follower
        from tasks.models import Task
        from wishes.models import Wish
        rows = []
        for name in CANDIDATES:
            user = User.objects.filter(username=name).first()
            if user is None:
                rows.append({'username': name, 'found': False})
                continue
            from django.db.models.deletion import Collector
            from django.db import DEFAULT_DB_ALIAS
            collector = Collector(using=DEFAULT_DB_ALIAS)
            collector.collect([user])
            counts = {model._meta.label: len(items) for model, items in collector.data.items()}
            for qs in collector.fast_deletes:
                counts[qs.model._meta.label] = counts.get(qs.model._meta.label, 0) + qs.count()
            row = {'username': name, 'found': True, 'staff': user.is_staff,
                   'superuser': user.is_superuser, 'active': user.is_active,
                   'cascade_counts': counts,
                   'owned': {model._meta.label: model.objects.filter(owner=user).count()
                             for model in [Post, Comment, Like, Follower, Task, Wish]}}
            # Inventory is not permission to delete; activity and ownership need review.
            rows.append(row)
        self.stdout.write(json.dumps({'read_only': True, 'accounts': rows}, indent=2))
