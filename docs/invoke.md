# GAN: Routine tasks #

For routine tasks we use [invoke](http://www.pyinvoke.org/) application.   

## Wrappers on manage.py: ##

Run server (`server_plus` from [django-extensions](https://django-extensions.readthedocs.io/en/latest/)):

```bash
inv run
```

Run shell (`shell_plus` from [django-extensions](https://django-extensions.readthedocs.io/en/latest/)):

```bash
inv shell
```

Run Celery for common purposes (worker only):

```bash
inv celery
```

Run Celery for mail sending (worker only):

```bash
inv mail-celery
```

Make messages:

```bash
inv make-messages your-lang
```

Compile messages:

```bash
inv compile-messages
```

## Running 3rd party: ##

Run PostgreSQL, Redis and [Mailhog](https://github.com/mailhog/MailHog) (for testing emails) locally in Docker:

```bash
inv compose
```

## Manage Python requirements: ##

To manage Python requirements we use [pip-tools](https://github.com/jazzband/pip-tools) utility.

Compile requirements:

```bash
inv pip.compile
```

Sync installed requirements:

```bash
inv pip.sync
```

## Tests: ##

Run unit tests + coverage:

```bash
inv test.run
```

Run unit tests + coverage + bandit + black + isort + pylama + safety:

```bash
inv test.run
```

Test security issues with [Bandit](https://bandit.readthedocs.io/en/latest/):

```bash
inv test.bandit
```

Test code format with [Black](https://black.readthedocs.io/en/stable/). Only check, without reformatting the code:

```bash
inv test.black-check
```

Reformat code with Black:

```bash
inv test.black
```

Test imports in code with [isort](https://isort.readthedocs.io/en/stable/). Only check, without reformatting the code:

```bash
inv test.isort-check
```

Reformat imports in code with isort:

```bash
inv test.isort
```

Check code with [pylama](https://pylama.readthedocs.io/en/stable/):

```bash
inv test.pylama
```

Check requirements for know vulnerabilities with [safety](https://pyup.io/safety/):

```bash
inv test.safety
```

## Miscellaneous: ##

Delete cached `*.pyc` files:

```bash
inv clean-pyc
```

Delete stale branches from Git:

```bash
inv git.delete-stale
```
