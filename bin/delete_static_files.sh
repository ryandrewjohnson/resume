#!/bin/bash
set -eu

STAGE="${1:-dev}"

echo "DELETE ALL STATIC ASSETS from ${STAGE}"

echo "Deleting static assets from ${STAGE}..."

BUCKET_NAME=$(aws \
    cloudformation describe-stacks \
    --stack-name "ryanjohnsondotca-${STAGE}" \
    --query "Stacks[0].Outputs[?OutputKey=='WebSiteBucket'] | [0].OutputValue" \
    --output text)

mkdir /tmp/empty

aws s3 sync --delete /tmp/empty/ "s3://${BUCKET_NAME}/"

rmdir /tmp/empty

echo "Bucket ${BUCKET_NAME} has been emptied"
