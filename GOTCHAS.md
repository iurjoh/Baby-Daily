# Regression and gotcha register

Quality trial started 2026-10-20. Review friction around 2026-11-20. Pass counters below record new, independently evidenced runs only, not historical results.

## Regressions

- [2026-10-21, draft PR #32] Tasks/wishes exposed anonymous and cross-user reads.
  Proposed regression: `python manage.py test bd_backend.test_private_collections bd_backend.test_qa_inventory`
  plus `cd frontend && npm test` for the private-route UX gate. Synthetic local
  fixtures only. Counter: 0/5 independently recorded consecutive passes.
  Independent QA approved the earlier head for preparation only, not release.
  See `docs/private-collections-review.md` for corrected fail-before counts,
  public-demo exclusions and the separate pre-existing Task.date issue.

Five recorded consecutive passes make a check eligible for automation; adding CI is a separate code change. Record revision, environment and evidence before increasing a count. No automatic edits or release approval follow from a counter.

## Gotchas

- [2026-10-20] The real commit history must be preserved - never rewrite or simulate it | source: owner standing rule, WhatsApp 2026-10 | version: current | validity: permanent | projects: Baby-Daily.
- [2026-10-20] Neon Postgres and Cloudinary credentials live only in env vars; an exposed key in another project ended in key deletion | source: owner session 2026-10-07 (exposed AI Studio keys deleted) | version: current | validity: permanent | projects: Baby-Daily, Pilares (2nd project: propose promotion to a shared rule - secrets only via env/CI).
- [2026-10-20] GitHub Support ticket #4816105 about this repo is open; coordinate with the owner before any history-altering operation | source: owner decision 2026-10-14 (wait for GitHub, recheck 2026-10-21) | version: current | validity: until the ticket is resolved | projects: Baby-Daily.
- [2026-10-20] "Backup exists" is an unproven claim until a restore drill runs on a disposable database | source: internal review 2026-10-18 | version: current | validity: until a restore test is done and evidenced | projects: Baby-Daily.

## Check entry points

Django backend: `python manage.py test` (see manage.py, bd_backend). Frontend tooling: inspect package.json scripts. Deployed on Render - report exactly what ran and where.

If a gotcha is independently observed in a second project, propose a shared rule with both sources.
