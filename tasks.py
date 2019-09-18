import os

from invoke import Collection, Failure, task


PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
PROJECT_NAME = "gan"
AVAILABLE_GIT_BRANCHES = ("develop",)


def color_print(message: str, color: str) -> None:
    print(f"{color}{message}\x1b[0m")


def print_success(message: str) -> None:
    color_print(message, "\x1b[32m")


def print_error(message: str) -> None:
    color_print(message, "\x1b[31m")


def print_warning(message: str) -> None:
    color_print(message, "\x1b[33m")


def fail(message: str) -> None:
    print_error(message)
    exit(1)


def _run_ansible_playbook(ctx, task_name, environment):
    with ctx.cd(os.path.join(PROJECT_PATH, "provisioning")):
        ctx.run(f"ansible-playbook {task_name}.yml -i environments/hosts.ini -e env={environment}", pty=True)


def _run_tests(ctx, use_plugins=True):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        pytest_command_args = (
            "pytest",
            "--cache-clear",
            "--capture=no",
            "--showlocals",
            "--verbose",
            f"--cov={PROJECT_NAME}",
            "--cov-report html",
        )
        if use_plugins:
            pytest_command_args += ("--bandit", "--isort", "--pylama")
        ctx.run(" ".join(pytest_command_args), pty=True)

    if use_plugins:
        try:
            test_black_check(ctx)
        except Failure:
            fail(f"Error checking format")
        else:
            print_success(f"Checking format was finished successfully")

        try:
            test_safety(ctx)
        except Failure:
            fail(f"Error checking known vulnerabilities")
        else:
            print_success(f"Checking known vulnerabilities was finished successfully")


@task()
def backend_run(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("WERKZEUG_DEBUG_PIN=off python manage.py runserver_plus 127.0.0.1:8000", pty=True)


@task()
def backend_shell(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("./manage.py shell_plus", pty=True)


@task()
def backend_clean_pyc(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("find . -name *.pyc -delete")
        ctx.run("find . -name *.pyo -delete")


@task()
def backend_celery(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"celery -A gan.celery_app worker -l DEBUG", pty=True)


@task()
def backend_mail_celery(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"celery -A gan.mail_celery_app worker -l DEBUG", pty=True)


@task()
def backend_make_messages(ctx, lang):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        backend_ignore_dirs = ["env"]
        backend_messages_commands = [f"./manage.py makemessages -l {lang}"]
        for dir_to_ignore in backend_ignore_dirs:
            backend_messages_commands.append(f"--ignore {dir_to_ignore}")

        client_ignore_dirs = ["env", "client/dist", "client/node_modules"]
        client_messages_commands = [f"./manage.py makemessages -d djangojs -l {lang} --extension js,jsx"]
        for dir_to_ignore in client_ignore_dirs:
            client_messages_commands.append(f"--ignore {dir_to_ignore}")

        with ctx.cd(os.path.join(PROJECT_PATH, "api")):
            ctx.run(" ".join(backend_messages_commands), pty=True)
            ctx.run(" ".join(client_messages_commands), pty=True)


@task()
def backend_compile_messages(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("./manage.py compilemessages", pty=True)


@task()
def backend_compose(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("docker-compose up", pty=True)


@task()
def deploy_develop(ctx, setup=False):
    if setup:
        task_name = "setup"
    else:
        task_name = "deploy"
    _run_ansible_playbook(ctx, task_name, "develop")


@task()
def pip_compile(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"pip-compile --upgrade --generate-hashes -o ./requirements.txt ./requirements.in", pty=True)


@task()
def pip_sync(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"pip-sync ./requirements.txt")


@task()
def test_all(ctx):
    _run_tests(ctx)


@task()
def test_run(ctx):
    _run_tests(ctx, use_plugins=False)


@task()
def test_isort(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("isort --apply")


@task()
def test_isort_check(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("isort --check")


@task()
def test_pylama(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("pylama")


@task()
def test_black(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"black {PROJECT_NAME}")


@task()
def test_black_check(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run(f"black --check {PROJECT_NAME}")


@task()
def test_bandit(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("bandit -r .")


@task()
def test_safety(ctx):
    with ctx.cd(os.path.join(PROJECT_PATH, "api")):
        ctx.run("safety check")


@task()
def git_delete_stale(ctx):
    git_branches_to_keep = "|".join(AVAILABLE_GIT_BRANCHES)
    ctx.run(f'git branch --merged | egrep -v "(^\\*|{git_branches_to_keep})" | xargs git branch -d')


deploy_collection = Collection("deploy")
git_collection = Collection("git")
pip_collection = Collection("pip")
test_collection = Collection("test")
deploy_collection.add_task(deploy_develop, name="develop")
git_collection.add_task(git_delete_stale, name="delete-stale")
pip_collection.add_task(pip_compile, name="compile")
pip_collection.add_task(pip_sync, name="sync")
test_collection.add_task(test_all, name="all")
test_collection.add_task(test_run, name="run")
test_collection.add_task(test_isort, name="isort")
test_collection.add_task(test_isort_check, name="isort-check")
test_collection.add_task(test_black, name="black")
test_collection.add_task(test_black_check, name="black-check")
test_collection.add_task(test_pylama, name="pylama")
test_collection.add_task(test_bandit, name="bandit")
test_collection.add_task(test_safety, name="safety")

collections = (deploy_collection, git_collection, pip_collection, test_collection)

namespace = Collection(*collections)
namespace.add_task(backend_run, name="run")
namespace.add_task(backend_shell, name="shell")
namespace.add_task(backend_clean_pyc, name="clean-pyc")
namespace.add_task(backend_celery, name="celery")
namespace.add_task(backend_mail_celery, name="mail-celery")
namespace.add_task(backend_make_messages, name="make-messages")
namespace.add_task(backend_compile_messages, name="compile-messages")
namespace.add_task(backend_compose, name="compose")
