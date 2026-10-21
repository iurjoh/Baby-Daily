"""Offline regression coverage for the Python CA build guard."""
import contextlib
import io
import runpy
from pathlib import Path
from unittest import TestCase, main
from unittest.mock import patch
import pip._vendor.certifi as vendored_certifi

GUARD = Path(__file__).with_name("check-python-ca.py")

class CertificateVersionGuardTests(TestCase):
    def run_guard(self, pip="26.2.2", certifi="2026.10.19", vendored="2026.10.19"):
        with patch("importlib.metadata.version", side_effect=lambda p: {"pip": pip, "certifi": certifi}[p]), patch.object(vendored_certifi, "__version__", vendored), contextlib.redirect_stdout(io.StringIO()):
            runpy.run_path(str(GUARD), run_name="__main__")

    def test_fixed_versions_pass(self):
        self.run_guard()

    def test_old_standalone_bundle_fails(self):
        with self.assertRaises(SystemExit):
            self.run_guard(certifi="2026.7.22")

    def test_old_pip_fails_even_with_fixed_standalone_bundle(self):
        with self.assertRaises(SystemExit):
            self.run_guard(pip="22.0.2")

    def test_old_vendored_bundle_fails(self):
        with self.assertRaises(SystemExit):
            self.run_guard(vendored="2026.7.22")

if __name__ == "__main__":
    main()
