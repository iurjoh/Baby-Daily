# Gotchas

Living list of pitfalls that already bit this project. Add every new one with its date. Once a month, lessons that apply everywhere are promoted to AGENTS.md.

- 2026-10: preserve the real commit history - never rewrite or simulate it (owner's standing rule).
- 2026-10: Neon Postgres and Cloudinary credentials live only in env vars; never commit them (an exposed key incident in another project led to key deletion).
- 2026-10: a GitHub Support ticket about the repo is open (#4816105) - coordinate with the owner before any history-altering operation.
- 2026-10: the backup restore path is unverified until a restore drill runs on a disposable database - treat "backup exists" as an unproven claim.
