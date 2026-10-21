"""Synthetic authorization regressions for private tasks and wishes."""
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from tasks.models import Task
from wishes.models import Wish


class PrivateCollectionsTests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username='fixture_owner')
        self.other = User.objects.create_user(username='fixture_other')
        self.admin = User.objects.create_user(username='fixture_staff', is_staff=True)
        self.superuser = User.objects.create_superuser(username='fixture_super', password='synthetic-test-password')
        self.task = Task.objects.create(owner=self.owner, title='Private fixture', description='Synthetic')
        self.wish = Wish.objects.create(owner=self.owner, title='Private fixture', description='Synthetic', price='1.00', purchase_link='https://example.com/item')
        self.resources = [('tasks', self.task), ('wishes', self.wish)]

    def test_anonymous_cannot_list_or_read(self):
        for route, obj in self.resources:
            for path in [f'/api/{route}/', f'/api/{route}/{obj.pk}/']:
                with self.subTest(path=path):
                    self.assertEqual(self.client.get(path).status_code, 401)

    def test_other_user_cannot_enumerate_or_filter_owner_items(self):
        self.client.force_authenticate(self.other)
        for route, obj in self.resources:
            for query in ['', '?owner__username=fixture_owner']:
                with self.subTest(route=route, query=query):
                    response = self.client.get(f'/api/{route}/{query}')
                    self.assertEqual(response.status_code, 200)
                    self.assertEqual(response.data['count'], 0)
            self.assertEqual(self.client.get(f'/api/{route}/{obj.pk}/').status_code, 404)

    def test_owner_and_staff_can_list_and_read(self):
        for user in [self.owner, self.admin, self.superuser]:
            self.client.force_authenticate(user)
            for route, obj in self.resources:
                with self.subTest(user=user.username, route=route):
                    response = self.client.get(f'/api/{route}/')
                    self.assertEqual(response.status_code, 200)
                    self.assertEqual(response.data['count'], 1)
                    self.assertEqual(self.client.get(f'/api/{route}/{obj.pk}/').status_code, 200)

    def test_other_user_cannot_update_or_delete(self):
        self.client.force_authenticate(self.other)
        for route, obj in self.resources:
            with self.subTest(route=route):
                self.assertEqual(self.client.patch(f'/api/{route}/{obj.pk}/', {'title':'Forged'}).status_code, 404)
                self.assertEqual(self.client.delete(f'/api/{route}/{obj.pk}/').status_code, 404)
                obj.refresh_from_db()
                self.assertEqual(obj.title, 'Private fixture')

    def test_owner_and_staff_can_update(self):
        for user in [self.owner, self.admin, self.superuser]:
            self.client.force_authenticate(user)
            for route, obj in self.resources:
                with self.subTest(user=user.username, route=route):
                    self.assertEqual(self.client.patch(f'/api/{route}/{obj.pk}/', {'title':'Updated fixture'}).status_code, 200)

    def test_create_binds_authenticated_owner_not_payload(self):
        self.client.force_authenticate(self.other)
        for route, model, extra in [('tasks', Task, {'date':'2026-10-21'}), ('wishes', Wish, {'price':'2.00','purchase_link':'https://example.com/fixture'})]:
            payload = {'title':'New fixture', 'description':'Synthetic', 'owner':self.owner.pk, **extra}
            response = self.client.post(f'/api/{route}/', payload)
            self.assertEqual(response.status_code, 201, response.data)
            self.assertEqual(model.objects.get(pk=response.data['id']).owner, self.other)

    def test_public_demo_posts_still_readable(self):
        from posts.models import Post
        post = Post.objects.create(owner=self.owner, title='Public synthetic demo')
        self.assertEqual(self.client.get('/api/posts/').status_code, 200)
        self.assertEqual(self.client.get(f'/api/posts/{post.pk}/').status_code, 200)

    def test_anonymous_writes_rejected_without_changes(self):
        for route, obj in self.resources:
            with self.subTest(route=route):
                self.assertEqual(self.client.post(f'/api/{route}/', {'title':'Blocked'}).status_code, 401)
                self.assertEqual(self.client.patch(f'/api/{route}/{obj.pk}/', {'title':'Blocked'}).status_code, 401)
                self.assertEqual(self.client.delete(f'/api/{route}/{obj.pk}/').status_code, 401)
                obj.refresh_from_db()
                self.assertEqual(obj.title, 'Private fixture')

    def test_owner_and_staff_can_delete(self):
        for user in [self.owner, self.admin, self.superuser]:
            self.client.force_authenticate(user)
            for route, model, extra in [('tasks', Task, {}), ('wishes', Wish, {'price':'1.00','purchase_link':'https://example.com/item'})]:
                obj = model.objects.create(owner=self.owner, title='Disposable fixture', description='Synthetic', **extra)
                with self.subTest(user=user.username, route=route):
                    self.assertEqual(self.client.delete(f'/api/{route}/{obj.pk}/').status_code, 204)
                    self.assertFalse(model.objects.filter(pk=obj.pk).exists())
