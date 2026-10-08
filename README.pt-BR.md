# Baby-Daily - revisão para revival do portfólio

**Português (Brasil)** | [English](README.md)

Projeto de aprendizado Django REST+React para marcos familiares, posts/comentários/tarefas/desejos. Intenção de círculo privado não é imposta pelas permissões de leitura atuais.

Draft documental, 08/10/2026. Código público; nenhuma publicação/alteração feita nesta revisão.

**Private backup / Backup privado:** https://github.com/iurjoh/Baby-Daily

**Inspected commit / Commit inspecionado:** `9c4b0e4140635a25d9f246d1c6a91c4907a53196`

**Historical URL, unavailable:** https://iurjoh-baby-daily-backend-api-1674476236b8.herokuapp.com/

## Ideia e planejamento

Planejamento histórico com user stories, MoSCoW/Kanban de três colunas para pais/família. História inclui recursos API/auth, componentes React/fluxos. Público pretendido não comprova controle de acesso.

## Funcionalidades e limites

Recursos post/comment/profile/like/follow, listas de tarefas/desejos/forms/infinite scroll presentes. Não usar dados reais de crianças na demo pública.

## Arquitetura

Backend DRF, React17/React Scripts4/Axios, mídia Cloudinary, database URL/arquivos Heroku. Django3.2.20/Pillow8.2/auth/HTTP antigos; frontend mira Node16.

## Design e capturas

Design histórico azul calmo, DM Sans/Bootstrap/navbar/avatar/forms reutilizáveis. Capturas antigas podem conter pessoas/registros: sem embed até review privacidade/direitos. Evidência nova totalmente sintética.

## Histórico do build

Base walkthrough DRF/Moments Code Institute ampliada com tarefas/desejos. Repo restaurado limpo em 1º de outubro/histórico novo. Não prova remoção de forks/caches antigos. Main sem nova correção de permissões/rebuild publicado.

## Desempenho

Notas Lighthouse/manuais históricas não são atuais. Sem startup full-stack/benchmark novo.

## Segurança e privacidade

Bloqueio: lista posts usa IsAuthenticatedOrReadOnly; permissão objeto permite SAFE_METHODS. Leitura anônima permitida. Auditar lista/detail/relacionados/URLs mídia antes de dados privados. Sem sqlite atual; limpeza antiga/suporte é separada.

## Evidência de testes

08/10/2026: permissões revisadas; URL backend Heroku sem app em pixels. posts/tests.py contém testes; seis outros tests.py são stubs. Suite API/frontend/auth ao vivo não executada.

## Executar localmente

```sh
# Prepare an isolated reviewed backend environment first.
# Use invented fixtures, not family records.
# Frontend build/auth/media and backend migrations need compatibility checks.
```

## Publicação e roadmap

Continuar tarefa já atribuída de permissões; acesso em endpoints/mídia; atualizar backend/frontend/retirar pacote 16 sem justificativa; testes negação/não dono; seed/reset sintético/host grátis; mídia/auth/CRUD ponta a ponta antes de deploy.

Nenhuma configuração de host/custo/branch alterada ou reconferida. Página acessível não prova paridade source/deploy.

## Créditos e licença

Walkthroughs Code Institute DRF/Moments, Django/DRF/React/Bootstrap/Cloudinary/créditos originais. Termos de terceiros sobrevivem à reescrita.

Sem LICENSE na raiz inspecionada. Não anunciar MIT antes de conferir direitos autorais/terceiros e aprovar licença. Nenhuma licença alterada.


## Atribuições originais preservadas

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


O repositório foi tornado privado em 08/10/2026 por instrução do dono, apenas para backup. Este PR não restaura nem publica a aplicação.
