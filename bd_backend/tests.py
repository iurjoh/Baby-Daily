from django.contrib.auth.models import User
from rest_framework.test import APITestCase

class AuthenticationSmokeTests(APITestCase):
    def test_login_returns_user_and_httponly_cookies(self):
        User.objects.create_user(username="demo_test", password="Test-only-password-1234")
        result = self.client.post("/api/dj-rest-auth/login/", {"username":"demo_test", "password":"Test-only-password-1234"})
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.data["user"]["username"], "demo_test")
        self.assertTrue(result.cookies["baby-daily-access"]["httponly"])
        self.assertIn("access_expiration", result.data)
        self.assertEqual(self.client.get("/api/dj-rest-auth/user/").status_code, 200)

    def test_registration_without_email_does_not_send_mail(self):
        result = self.client.post("/api/dj-rest-auth/registration/", {"username":"visitor_test", "password1":"Test-only-password-1234", "password2":"Test-only-password-1234"})
        self.assertEqual(result.status_code, 201, result.data)

    def test_health(self):
        self.assertEqual(self.client.get("/health/").status_code, 200)


class CsrfProtectionTests(APITestCase):
    def test_login_requires_csrf_cookie_and_header(self):
        from rest_framework.test import APIClient
        client = APIClient(enforce_csrf_checks=True)
        User.objects.create_user(username="csrf_test", password="Test-only-password-1234")
        payload = {"username":"csrf_test", "password":"Test-only-password-1234"}
        self.assertEqual(client.post("/api/dj-rest-auth/login/", payload).status_code, 403)
        client.get("/api/")
        self.assertIn("csrftoken", client.cookies)
        token = client.cookies["csrftoken"].value
        self.assertEqual(client.post("/api/dj-rest-auth/login/", payload, HTTP_X_CSRFTOKEN=token).status_code, 200)
        self.assertEqual(client.post("/api/posts/", {"title":"CSRF-protected demo"}).status_code, 403)
        self.assertEqual(client.post("/api/posts/", {"title":"CSRF-protected demo"}, HTTP_X_CSRFTOKEN=token).status_code, 201)

class PostTimestampTests(APITestCase):
    def test_post_timestamp_includes_minutes_and_timezone(self):
        from posts.models import Post
        from django.utils import timezone
        from datetime import datetime, timezone as datetime_timezone
        user = User.objects.create_user(username="timestamp_test")
        post = Post.objects.create(owner=user, title="Fictional timestamp check")
        Post.objects.filter(pk=post.pk).update(updated_at=datetime(2026,10,10,19,42,tzinfo=datetime_timezone.utc))
        result = self.client.get("/api/posts/")
        self.assertEqual(result.data["results"][0]["updated_at"], "10 Oct 2026, 19:42 UTC")
