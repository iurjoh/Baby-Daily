# Python CA incident remediation, 2026-10-21

Sources:
- https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576
- https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2
- https://pypi.org/pypi/pip/26.2.2/json

The application pinned certifi 2026.7.22. This patch pins 2026.10.19, securely bootstraps pip 26.2.2 using the advisory's wheel URL and SHA256, and checks both standalone and pip-vendored certifi before tests or Render application build steps. Upgrading standalone certifi alone does not fix pip's bundled trust roots.

## Verification and limits

- Disposable local test environment: pip 26.2.2, certifi 2026.10.19 and pip-vendored certifi 2026.10.19 verified; 26 backend tests pass.
- Four offline guard regressions cover fixed versions, an old standalone bundle, old pip with a fixed standalone bundle, and an old vendored bundle.
- This is a preparation patch. Production package versions and the hosting provider's system CA store are not certified until a reviewed deployment and runtime verification.
- The frontend is JavaScript and does not use the Python dependency bundle.
- The legacy `.gitpod.dockerfile` uses Python 3.8.11, below pip 26.2.2's supported Python >=3.10. It also has unrelated old system dependencies. It has NOT been rebuilt or modernized by this patch. Do not use that legacy container as a remediated environment. Container rebuilds and CA-store verification require a supported base image and a separate tested change.
- New virtual environments may inherit old pip through ensurepip; run `bash scripts/bootstrap-pip.sh` before installing requirements, then `python scripts/check-python-ca.py`.
- No account data, application content or production settings are changed by this patch. A future ordinary Render build still runs the existing fictional demo seed; that behavior is unchanged.
