git filter-branch -f --env-filter "GIT_AUTHOR_NAME='actiongeek'; GIT_AUTHOR_EMAIL='software.dev0218@gmail.com'; GIT_COMMITTER_NAME='actiongeek'; GIT_COMMITTER_EMAIL='software.dev0218@gmail.com';"

git push --force origin master