from io import StringIO
import json
from django.contrib.auth.models import User
from django.core.management import call_command
from django.test import TestCase
from posts.models import Post


class QaInventoryTests(TestCase):
    def test_exact_allowlist_read_only_and_cascade_counts(self):
        candidate = User.objects.create_user(username='qa_owner_demo')
        extra = User.objects.create_user(username='qa_new_unapproved')
        demo = User.objects.create_user(username='alex_demo')
        Post.objects.create(owner=candidate, title='Synthetic QA fixture')
        before = (User.objects.count(), Post.objects.count())
        out = StringIO()
        call_command('audit_qa_accounts', stdout=out)
        report = json.loads(out.getvalue())
        self.assertTrue(report['read_only'])
        self.assertEqual(len(report['accounts']), 8)
        row = next(x for x in report['accounts'] if x['username'] == candidate.username)
        self.assertEqual(row['owned']['posts.Post'], 1)
        self.assertEqual(row['cascade_counts']['posts.Post'], 1)
        self.assertNotIn(extra.username, [x['username'] for x in report['accounts']])
        self.assertNotIn(demo.username, [x['username'] for x in report['accounts']])
        self.assertEqual(before, (User.objects.count(), Post.objects.count()))
