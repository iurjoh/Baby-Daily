# Full-stack revival (October 2026)

This project preserves Iuri Johansson's original 2023 coursework and commit history. The revival keeps the original React screens and Django domain models while replacing retired hosting and dependencies. The Django API is deployed on Render Free with Neon Free PostgreSQL. The Cloudflare Pages same-origin gateway and live authentication/CRUD tests passed. Cloudinary media is configured and original demo images are verified live. Mobile/accessibility review and final screenshots remain pending.

## Architecture

- Django 5.2 LTS + Django REST Framework; PostgreSQL in production.
- React 17 + React Router 5, bundled with Vite on Node 22.
- Cloudflare Pages frontend and same-origin `/api/` gateway to Render Free.
- Cloudinary storage for original demo artwork, configured only through private environment variables.
- HttpOnly JWT cookies, same-origin CSRF checks, explicit host/origin configuration.

The gateway avoids third-party-cookie dependence when the API and frontend have different domains. API responses are never cached. Database and media credentials are not part of the source.

## Fictional demonstration

`python manage.py seed_demo` adds three fictional profiles, five stories, one task and one wish. It is idempotent and gives seeded accounts unusable passwords. No owner account, email address or private family data is imported. All new illustration assets are original.

This is a public portfolio demo, not a private service for real children's data. The original permission model allows public read access. Do not upload real family photos or personal information.

## Current local verification

- Django system checks and migrations pass.
- Sixteen Django tests cover legacy post CRUD/ownership, JWT login, registration and health.
- Eleven frontend navigation/authentication/accessibility tests have been migrated to Vitest and MSW 2.
- Vite production build passes.
- npm audit reports zero known vulnerabilities (October 11, 2026).
- pip-audit reports zero known vulnerabilities after upgrading DRF to 3.17.2 (October 11, 2026). JSON/form body-size limits and malformed JSON rejection have local regression tests.

Live API checks passed on October 10, 2026: registration without email, login, Secure/HttpOnly cookies, current user, post/task/wish create-edit-delete, token refresh and logout. Test objects were removed. A fictional verification account remains for browser checks. Both API and frontend use the revival branch pending final review and merge. Cloudinary media is verified live; mobile/accessibility review and final screenshots remain pending. Historical 2023 screenshots are not evidence of the current deployment.


## Deployment checks

Run `bash scripts/check-deploy.sh` from the repo root, with `DEV` unset and the production `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS` and `CLIENT_ORIGIN` supplied privately by the hosting environment. Do not paste credentials into terminal command history or logs. The script prints only Django check results, not settings. It does not migrate, seed or connect to the database. The Render build runs it before those actions. CI runs the same configuration path with random, throwaway credentials, not live ones.

On October 10, 2026 the production-mode check first reported W004 and W008. HTTPS redirect is now on outside development, with a public `/health/` exception for internal probes. The existing proxy header accepts Render's forwarded HTTPS scheme; regression tests cover redirect, forwarded HTTPS and the health probe. The live edge also redirected HTTP to HTTPS when checked.

Known warning: `security.W004` (HSTS). `SECURE_HSTS_SECONDS=0` is deliberate. HSTS changes persist in browsers, and a domain/HTTPS rollout should be reviewed before enabling it. No checks are silenced. Errors stop the build; this documented warning does not. DEBUG is off in production, host/origin lists are explicit, and session/CSRF cookies are Secure. This is configuration validation, not independent QA approval or a full security audit.


## Dependency security follow-up (October 11, 2026)

The requirements scan found PYSEC-2026-3827 and PYSEC-2026-3828 in DRF 3.16.1. Both are fixed in 3.17.2. The request-body limit issue applies to JSON/form parsing. The AdminRenderer issue does not match production, which permits JSONRenderer only, but the package is upgraded for both fixes. No live load or denial-of-service test was run. Local tests use a small temporary body limit.

Sources: [DRF 3.17.2 release](https://github.com/encode/django-rest-framework/releases/tag/3.17.2), [body-size advisory](https://github.com/encode/django-rest-framework/security/advisories/GHSA-2m8g-3cmr-wg3w), [AdminRenderer advisory](https://github.com/encode/django-rest-framework/security/advisories/GHSA-g47c-3xmw-q6m2).

This scan and regression suite are not a full security audit or independent approval. Repository publication remains gated on final production/seed/security review, including historical refs.
