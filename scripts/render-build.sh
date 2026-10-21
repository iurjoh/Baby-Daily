#!/usr/bin/env bash
set -euo pipefail
bash scripts/bootstrap-pip.sh
python -m pip install -r requirements.txt
python scripts/check-python-ca.py
bash scripts/check-deploy.sh
python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py seed_demo
