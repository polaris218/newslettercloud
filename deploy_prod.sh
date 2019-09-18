#!/bin/bash

yarn build

aws s3 sync build/ s3://beta-getanewsletter
aws cloudfront create-invalidation --distribution-id E1YLR96ZWZQFKN --paths "/*"
