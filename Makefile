all:
	echo "Nothing to be done"

deploy_v3_develop:
	CIRCLE_BRANCH=v3_develop /bin/bash deploy.sh

deploy_v3_stable:
	CIRCLE_BRANCH=v3_stable /bin/bash deploy.sh
