#!/bin/bash

# Debug Build Issue Script
# This script helps debug and fix the build directory permission issue

set -e

echo "=== Debugging Build Issue ==="

# Check current directory
echo "Current directory: $(pwd)"

# Check environment variables that might affect the build
echo "=== Environment Variables ==="
echo "NODE_ENV: $NODE_ENV"
echo "VITE_* variables:"
env | grep VITE_ || echo "No VITE_ variables found"

# Check if there are any symlinks or unusual paths
echo "=== Checking for symlinks ==="
ls -la | grep -E "^l" || echo "No symlinks found"

# Check the dist directory structure
echo "=== Checking dist directory ==="
if [ -d "dist" ]; then
    ls -la dist/
    if [ -d "dist/public" ]; then
        ls -la dist/public/
    fi
else
    echo "dist directory doesn't exist"
fi

# Check if there's a /home/public directory
echo "=== Checking /home/public ==="
if [ -d "/home/public" ]; then
    echo "WARNING: /home/public directory exists!"
    ls -la /home/public/
else
    echo "/home/public directory doesn't exist"
fi

# Check npm and node versions
echo "=== Node.js and npm versions ==="
node --version
npm --version

# Check if the issue is with the build command itself
echo "=== Testing build command ==="
echo "Running: npm run build"
echo "This will show the exact error..."

# Run the build command to see the exact error
npm run build 