#!/bin/bash
set -e  # stop on any error

TAG=$(git rev-parse --short HEAD)
echo "Building with tag: $TAG"

docker build -t jerinirowz/mf-host:$TAG ./host-app
docker build -t jerinirowz/mf-product:$TAG ./product-app
docker build -t jerinirowz/mf-cart:$TAG ./cart-app

docker push jerinirowz/mf-host:$TAG
docker push jerinirowz/mf-product:$TAG
docker push jerinirowz/mf-cart:$TAG

echo "Done. Tag: $TAG"
echo $TAG > .last-tag  # save tag for deploy script