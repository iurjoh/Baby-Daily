"""Fail a build that reintroduces pre-remediation Python CA packages."""
from importlib.metadata import version
from packaging.version import Version
import pip._vendor.certifi as vendored_certifi

for package, minimum in (("pip", "26.2.2"), ("certifi", "2026.10.19")):
    actual = version(package)
    if Version(actual) < Version(minimum):
        raise SystemExit(f"{package} {actual} is below security minimum {minimum}")
    print(f"{package}: {actual}")
if Version(vendored_certifi.__version__) < Version("2026.10.19"):
    raise SystemExit("pip's vendored certifi is below security minimum")
print(f"pip vendored certifi: {vendored_certifi.__version__}")
