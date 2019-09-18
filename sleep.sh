#!/bin/sh

# Used for debugging
# It could be set as CMD command in Dockerfile which will prevent containder to exit.
# Then you can log in to container with docker-compose exec <containder name> /bin/sh(bash)

/bin/sh -c "sleep 1d"
