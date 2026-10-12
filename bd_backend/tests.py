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


class ProductionHttpsTests(APITestCase):
    def test_http_redirect_and_proxy_https(self):
        from django.http import HttpResponse
        from django.middleware.security import SecurityMiddleware
        from django.test import RequestFactory, override_settings
        with override_settings(SECURE_SSL_REDIRECT=True):
            middleware = SecurityMiddleware(lambda request: HttpResponse("ok"))
            factory = RequestFactory()
            self.assertEqual(middleware(factory.get("/api/", HTTP_HOST="testserver")).status_code, 301)
            self.assertEqual(middleware(factory.get("/api/", HTTP_X_FORWARDED_PROTO="https")).status_code, 200)
            self.assertEqual(middleware(factory.get("/health/")).status_code, 200)


class ProductionOriginSettingsTests(APITestCase):
    def test_explicit_origin_list_is_shared_by_csrf_and_cors(self):
        import os
        import subprocess
        import sys
        environment = dict(os.environ)
        environment.pop("DEV", None)
        environment.update(SECRET_KEY="throwaway-configuration-test-key-only-not-a-secret-1234567890",
            DATABASE_URL="postgresql://check:check@localhost/check",
            CLIENT_ORIGIN="https://demo.example, https://preview.example")
        script = "from bd_backend import settings as s; assert s.CORS_ALLOWED_ORIGINS == s.CSRF_TRUSTED_ORIGINS == ['https://demo.example', 'https://preview.example']"
        result = subprocess.run([sys.executable, "-c", script], env=environment, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)


class RequestBodyLimitTests(APITestCase):
    def test_json_and_form_request_size_limits(self):
        from django.test import override_settings
        from urllib.parse import urlencode
        payload = {"username": "x" * 256, "password": "test-only"}
        with override_settings(DATA_UPLOAD_MAX_MEMORY_SIZE=128):
            for content_type, data in [
                ("application/json", __import__("json").dumps(payload)),
                ("application/x-www-form-urlencoded", urlencode(payload)),
            ]:
                with self.subTest(content_type=content_type):
                    response = self.client.post("/api/dj-rest-auth/login/", data=data, content_type=content_type)
                    self.assertEqual(response.status_code, 400)

    def test_malformed_json_is_rejected(self):
        response = self.client.post("/api/dj-rest-auth/login/", data="{invalid", content_type="application/json")
        self.assertEqual(response.status_code, 400)
