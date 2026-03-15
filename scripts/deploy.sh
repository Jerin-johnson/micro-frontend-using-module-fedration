#!/bin/bash
set -e

TAG=${1:-$(cat .last-tag)}  # use arg or last built tag
echo "Deploying tag: $TAG"

# Replace :latest with actual tag in yaml files
sed -i "s|:latest|:$TAG|g" k8s/*.yaml

kubectl apply -f k8s/

echo "Waiting for rollout..."
kubectl rollout status deployment/host-deployment
kubectl rollout status deployment/product-deployment
kubectl rollout status deployment/cart-deployment

echo "Deployed successfully!"

# Restore :latest in yaml so git doesn't show dirty changes
sed -i "s|:$TAG|:latest|g" k8s/*.yaml