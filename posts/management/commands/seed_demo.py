"""Idempotent, fictional portfolio content. Never imports owner data.

All people, photos and text are fictional. The demo photos and avatars are
AI-generated illustrations of imaginary families, uploaded to the media
account as baby-daily/<name>. Safe to rerun: rows are updated in place.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from comments.models import Comment
from likes.models import Like
from posts.models import Post
from tasks.models import Task
from wishes.models import Wish


class Command(BaseCommand):
    help = "Create fictional portfolio demo content (safe to rerun)."

    @transaction.atomic
    def handle(self, *args, **options):
        people = [
            ("alex_demo", "Alex", "A fictional parent collecting everyday memories.", "baby-daily/avatar-alex"),
            ("jordan_demo", "Jordan", "A fictional family member cheering on little milestones.", "baby-daily/avatar-jordan"),
            ("casey_demo", "Casey", "A fictional grandparent who loves story time.", "baby-daily/avatar-casey"),
        ]
        users = []
        for username, name, bio, avatar in people:
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_unusable_password()
                user.save(update_fields=["password"])
            user.profile.name = name
            user.profile.content = bio
            user.profile.image = avatar
            user.profile.save()
            users.append(user)

        stories = [
            (0, "A tiny first step",
             "Three wobbly steps across the living room today, straight into Mum's arms. We cheered so loudly the plants shook.",
             "baby-daily/post-first-steps"),
            (1, "Story time with stars",
             "Bedtime ritual: the star lamp, a soft blanket and our favourite picture book. Asleep before the last page, again.",
             "baby-daily/post-story-time"),
            (2, "The garden explorer",
             "Grandma took our little explorer to the flower garden. Sun hat on, giggles all afternoon and a very serious inspection of every daisy.",
             "baby-daily/post-garden"),
            (0, "Breakfast discoveries",
             "Oatmeal and berries for the first time. Verdict: delicious, and the messiest face of the week.",
             "baby-daily/post-breakfast"),
            (1, "A rainbow afternoon",
             "Handprints and a big paper rainbow on the porch. Every colour has a story, and every hand a different shade of messy.",
             "baby-daily/post-rainbow"),
        ]
        posts = []
        for who, title, content, image in stories:
            post, _ = Post.objects.update_or_create(
                owner=users[who], title=title,
                defaults={"content": content, "image": image, "image_filter": "normal"},
            )
            posts.append(post)

        comments = [
            (0, 1, "Those little legs are so brave!"),
            (2, 0, "I can almost hear the cheering from here."),
            (1, 2, "What a lovely book choice. Sleep tight, little one."),
            (2, 3, "Berries look good on everyone, even on cheeks."),
            (0, 4, "That rainbow deserves a frame."),
        ]
        for post_index, who, text in comments:
            Comment.objects.get_or_create(
                owner=users[who % len(users)], post=posts[post_index], content=text
            )

        for post in posts:
            for user in users:
                if user != post.owner:
                    Like.objects.get_or_create(owner=user, post=post)

        Task.objects.get_or_create(owner=users[0], title="Pack the picnic blanket", defaults={"description": "Fictional family picnic checklist", "priority": "medium"})
        Wish.objects.get_or_create(owner=users[0], title="A colourful story book", defaults={"description": "Fictional wish list example", "price": "12.00", "purchase_link": "https://example.com"})
        self.stdout.write(self.style.SUCCESS("Fictional demo content ready. No demo passwords or personal data."))
