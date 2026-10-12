#!/usr/bin/env bash
set -euo pipefail
# Run with production environment values already supplied by the hosting service.
if [[ -v DEV ]]; then
  printf '%s\n' 'Deployment check requires DEV to be unset.' >&2
  exit 1
fi
: "${SECRET_KEY:?SECRET_KEY must be set}"
: "${DATABASE_URL:?DATABASE_URL must be set}"
: "${ALLOWED_HOSTS:?ALLOWED_HOSTS must be set}"
: "${CLIENT_ORIGIN:?CLIENT_ORIGIN must be set}"
# Errors stop the build. Known warning security.W004 is documented, not silenced.
python manage.py check --deploy --fail-level ERROR
