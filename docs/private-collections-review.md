# Draft: task/wish access boundary and QA account inventory

Prepared 2026-10-21 for review. No merge, deployment, or live account deletion.

## Observed baseline

Unauthenticated GET on the published demo returned posts, profiles, comments,
likes, followers, tasks and wishes. The sampled task and wish described
fictional examples. This inspection does not prove every record or upload is
fictional. No write requests were made to the published application.
The current-user endpoint rejected an unauthenticated request with 401.

## Proposed boundary

- Public portfolio posts, profiles, comments and reaction information remain
  unchanged. This is still a fictional public demo, not a private family service.
- Tasks and wishes require login for list, detail and write operations.
- A regular user can access only their own tasks/wishes, including filtered
  lists and guessed detail URLs. Another user's detail returns 404.
- Staff keep access to all tasks/wishes. Creation always assigns the signed-in
  user, ignoring a forged owner field.
- There is no invitation/shared-family model in this patch. If members need
  shared access later, define that model explicitly before using real data.
- No frontend component changes. Anonymous task/wish screens may currently
  render an empty screen/list after the API rejects the request. UX messaging
  needs independent review before a release is proposed.

## QA accounts: preparation only

`python manage.py audit_qa_accounts` is read-only, with no apply/delete flag.
It inventories an explicit allowlist of eight QA usernames seen in the demo
and reports staff flags, owned record counts and deletion cascade counts.
It neither matches arbitrary `qa_*` accounts nor includes `verification_demo`
or the three main demo profiles. A username is only a candidate, not proof of
identity, ownership, inactivity or permission to delete.

Before any cleanup: run the inventory through an approved access route, review
activity and related records, preserve an approved recoverable backup and
confirm restoration on a disposable database, agree on exact accounts and
related effects, then obtain separate approval for the destructive action.
No live inventory with database credentials or cleanup was performed here.
No delete implementation is included, intentionally.

## Reproduction

Use a disposable local environment with `DEV=1` and a throwaway `SECRET_KEY`.
The standard backend suite uses an in-memory test database. Do not point tests
at production database or media services.

```
python manage.py test bd_backend.test_private_collections bd_backend.test_qa_inventory
python manage.py test
```

The first seven new boundary tests were run against the original views and
failed in ten subcases. They pass after the owner-scoped queryset and login
requirements. Additional tests cover blocked anonymous writes and owner/staff
deletion. Inventory tests prove exact allowlist matching and no database
mutation. Existing public-post tests remain unchanged.

Sweep: both tasks and wishes list/detail views, both object permission
classes, serializers, models and frontend task/wish callers were inspected.
Posts/profiles/comments/likes/followers remain public by existing demo design;
this is not certification of every endpoint, cross-user flow or media URL.
Issue #2 remains open for that broader review.

An existing task-model issue surfaced while writing a create test: its date
field defaults to a datetime, which can fail immediate DRF serialization when
no date is supplied. The fixture now sends an explicit date, matching the
frontend form. This patch does not claim to fix that separate issue.

Independent QA and owner approval of the exact revision are still required.
