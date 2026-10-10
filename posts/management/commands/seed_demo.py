"""Idempotent, fictional portfolio content. Never imports owner data."""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from posts.models import Post
from tasks.models import Task
from wishes.models import Wish

class Command(BaseCommand):
    help = "Create fictional portfolio demo content (safe to rerun)."

    @transaction.atomic
    def handle(self, *args, **options):
        people = [
            ("alex_demo", "Alex", "A fictional parent collecting everyday memories."),
            ("jordan_demo", "Jordan", "A fictional family member cheering on little milestones."),
            ("casey_demo", "Casey", "A fictional grandparent who loves story time."),
        ]
        users = []
        for username, name, bio in people:
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_unusable_password()
                user.save(update_fields=["password"])
            user.profile.name = name
            user.profile.content = bio
            user.profile.image = "baby-daily/default-avatar"
            user.profile.save()
            users.append(user)
        stories = [
            (0, "A tiny first step", "Today our fictional little one took three wobbly steps. A small moment worth remembering."),
            (1, "Story time with stars", "A make-believe bedtime story, a soft blanket and a room full of giggles."),
            (2, "The garden explorer", "We counted flowers and listened to birds during a fictional family walk."),
            (0, "Breakfast discoveries", "A pretend morning of new tastes, big smiles and a very messy spoon."),
            (1, "A rainbow afternoon", "Our fictional family painted a rainbow together. Every colour has a story."),
        ]
        for who, title, content in stories:
            Post.objects.get_or_create(owner=users[who], title=title, defaults={"content":content,"image":"baby-daily/default-post"})
        Task.objects.get_or_create(owner=users[0], title="Pack the picnic blanket", defaults={"description":"Fictional family picnic checklist", "priority":"medium"})
        Wish.objects.get_or_create(owner=users[0], title="A colourful story book", defaults={"description":"Fictional wish list example", "price":"12.00", "purchase_link":"https://example.com"})
        self.stdout.write(self.style.SUCCESS("Fictional demo content ready. No demo passwords or personal data."))
