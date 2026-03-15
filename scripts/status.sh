#!/bin/bash
echo "=== Pods ==="
kubectl get pods

echo ""
echo "=== Services ==="
kubectl get services

echo ""
echo "=== Ingress ==="
kubectl get ingress

echo ""
echo "=== Recent events ==="
kubectl get events --sort-by='.lastTimestamp' | tail -10