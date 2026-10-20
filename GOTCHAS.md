# GOTCHAS.md — Baby-Daily

Traps that already bit this project. Read before editing. When one becomes a general rule it moves to AGENTS.md.

- **Truncated rendered time**: a post card showed "10 Oct 2026 19" (minutes cut). Verify rendered content, not just code, after touching date/time formatting.
- **Login 403 after deploy**: auth broke once in production while working locally. Test register/login/guest flows live after any auth change.
- **First QA review failed on basics**: missing form labels and weak contrast. Run axe before requesting review.
- **Fictitious qa_* accounts are visible**: test accounts appear in public lists like "Most followed" — keep test data obviously fictional.
- **Copyright history**: the original course images used third-party art. Only synthetic or freely licensed images now — check licences before adding media.
