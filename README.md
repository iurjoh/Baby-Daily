# Baby-Daily - portfolio revival review

**English** | [Português (Brasil)](README.pt-BR.md)

A Django REST + React learning project for family milestones, posts, comments, tasks and wish lists. Private-circle intent is not enforced by current read permissions.

Documentation draft, 2026-10-08. Private backup; no application or code change made by this review.

**Private backup / Backup privado:** https://github.com/iurjoh/Baby-Daily

**Inspected commit / Commit inspecionado:** `9c4b0e4140635a25d9f246d1c6a91c4907a53196`

**Historical URL, unavailable:** https://iurjoh-baby-daily-backend-api-1674476236b8.herokuapp.com/

## Idea and planning

Historical planning uses user stories, MoSCoW priorities and a three-column Kanban record for parent/family interaction. Build story includes API resources, auth, reusable React components and user flows. No fresh access-control proof follows from the intended audience.

## Features and limits

Post/comment/profile/like/follow resources, task and wish lists, forms and infinite scrolling are present. Real children’s data must not be used in this public portfolio demo.

## Architecture

DRF backend, React 17 / React Scripts 4 frontend and Axios; Cloudinary media; database URL configuration and legacy Heroku files. Backend pins Django 3.2.20, Pillow 8.2 and older auth/HTTP packages; frontend still targets Node 16.

## Design and screenshots

Historical design uses calm blue tones, DM Sans, Bootstrap and reusable navbar/avatar/forms. Retained screenshots may include people/records; not embedded until privacy and rights are reviewed. New evidence must be fully synthetic.

## Build history

Code Institute DRF/Moments walkthrough-based project extended with tasks/wishes. Current repo was restored clean on October 1 with a new history. This does not prove removal from old forks/caches. Main has no new permissions fix or deployed rebuild.

## Performance

Historical Lighthouse/manual notes are not fresh results. No full-stack startup or new benchmark run in this review.

## Security and privacy

Release blocker: post list uses IsAuthenticatedOrReadOnly; object permission allows SAFE_METHODS. Anonymous reads are allowed. Audit list/detail, related resources and direct media URLs before any private-data use. No sqlite file found in current tree; prior history/support cleanup is a separate responsibility.

## Testing evidence

2026-10-08: permissions source reviewed; old backend Heroku URL visually has no app. posts/tests.py has test code, while six other tests.py files are starter stubs. No API/frontend suite or live authorization test was executed.

## Run locally

```sh
# Prepare an isolated reviewed backend environment first.
# Use invented fixtures, not family records.
# Frontend build/auth/media and backend migrations need compatibility checks.
```

## Deployment and roadmap

Continue the already assigned permissions work; enforce intended access on all endpoints/media; modernize backend/frontend dependencies and remove unexplained package 16; add denied-read/non-owner tests; plan synthetic seed/reset and free hosting; test media/auth/CRUD end to end before deployment.

No hosting account/cost settings or deployment branch were changed or freshly verified. Reachable pages do not prove source/deployment parity.

## Credits and license

Code Institute Django REST Framework and Moments walkthroughs; Django/DRF/React/Bootstrap/Cloudinary and retained original asset credits. Third-party terms survive a README rewrite.

No root LICENSE exists in the inspected checkout. Do not advertise MIT until original-code rights and third-party terms are checked and a license is approved. No license changed.


## Retained original attributions

### Credits

### Code Used

- Code Institutes 'Django Rest Framework Walkthrough Videos'
- Code Institutes 'Moments Walkthrough Videos'

### Content

- [Stack Overflow](https://stackoverflow.co/) were used at various times to clear up recurring doubts;
- [Code Institute](https://learn.codeinstitute.net/) to review material of study explanatory videos and guides on how to set up a complete website;
- [GitHub](https://github.com/) to better understand other projects;
- [Google](https://www.google.com) for more information on subjects related to the that I had to study during the creation of the site;
- [Youtube](https://www.youtube.com/) tutorials to learn using in a practical way some of the methods necessary to implement the desired functions for the blog;
- [Pycodestyle](https://pypi.org/project/pycodestyle/) used to validade my python code;
- [Flake8](https://flake8.pycqa.org/en/latest/) used to test my pyhton code at local terminal;
- [CI Python Linter](https://pep8ci.herokuapp.com/#) used to test if my pyhton code it complies with PEP8;
- [Extends Class](https://extendsclass.com/python-tester.html) used to test my python code syntax;
- [JSFiddle](https://jsfiddle.net/) used to test my few lines of JavaScript in this project;
- [Slack](https://slack.com/) communities to ask questions and access answers to questions that I found in the development of the site;
- [Django Documentation](https://docs.djangoproject.com/en/4.1/) to access all the documentation implemented in this project including models, views, etc;
- [Django Social Share](https://pypi.org/project/django-social-share/) to access all the documentation to implement share buttons function;
- [Django Allauth](https://django-allauth.readthedocs.io/en/latest/) to access all the documentation to implement authentication and authorization functions;
- [Django Bootstrap Icons](https://pypi.org/project/django-bootstrap-icons/) to access all the documentation to implement the use of the icons that are inside the share buttons;
- [Font Awesome](https://fontawesome.com/icons) to get icons for this project;
- [Coolors](https://coolors.co/) for inspiration about color palettes;
- [Bootstrap Icons](https://icons.getbootstrap.com/) to get icons for this project;
- [Bootstrap Documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/) to access all the documentation to use many of Bootstrap shortcuts;
- [Kera Cudmore](https://github.com/kera-cudmore/readme-examples/blob/main/milestone1-readme.md) as an exampel of a good README file structure.

### Media

- [Am I Responsive](https://ui.dev/amiresponsive) Multi Device Website Mockup Generator was used to generate the image used in this README.md in the opening section.

### Acknowledgements
- My mentor for continuous helpful feedback.


The repository was made private on 2026-10-08 under the owner's instruction, for backup only. This PR does not restore or publish the application.
