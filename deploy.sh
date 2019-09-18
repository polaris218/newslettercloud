#!/bin/bash
if [ "$CIRCLE_BRANCH" = "v3_develop" ]
then
  DEST_DIR=/gan_v3_develop
elif [ "$CIRCLE_BRANCH" = "v3_stable" ]
then
  DEST_DIR=/gan_v3_stable
else
  exit
fi

ssh -oStrictHostKeyChecking=no root@oo.gan.comingsoon.rocks "rm -rf $DEST_DIR/*"
scp -rp -oStrictHostKeyChecking=no ~/repo/build/* root@oo.gan.comingsoon.rocks:$DEST_DIR/
