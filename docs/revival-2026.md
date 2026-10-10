# Full-stack revival (October 2026)

This project preserves Iuri Johansson's original 2023 coursework and commit history. The revival keeps the original React screens and Django domain models while replacing retired hosting and dependencies. The Django API is deployed on Render Free with Neon Free PostgreSQL. The Cloudflare Pages same-origin gateway and live authentication/CRUD tests passed. Cloudinary media setup and final screenshots remain pending.

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
- Eleven Django tests cover legacy post CRUD/ownership, JWT login, registration and health.
- Three frontend navigation/authentication tests have been migrated to Vitest and MSW 2.
- Vite production build passes.
- npm audit currently reports zero known vulnerabilities (October 10, 2026).

Live API checks passed on October 10, 2026: registration without email, login, Secure/HttpOnly cookies, current user, post/task/wish create-edit-delete, token refresh and logout. Test objects were removed. A fictional verification account remains for browser checks. Both API and frontend use the revival branch pending final review and merge. Cloudinary media and final screenshots remain pending. Historical 2023 screenshots are not evidence of the current deployment.
