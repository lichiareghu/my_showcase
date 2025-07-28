#!/bin/bash

# Fix Build Permissions Script
# This script fixes permission issues with the build process

set -e

echo "Fixing build directory permissions..."

# Remove any existing dist directory and recreate with proper permissions
rm -rf dist
mkdir -p dist/public

# Set proper ownership and permissions
sudo chown -R ubuntu:ubuntu dist/
chmod -R 755 dist/

# Clean npm cache and node_modules if needed
echo "Cleaning npm cache..."
npm cache clean --force

# Remove node_modules and reinstall if there are permission issues
if [ -d "node_modules" ]; then
    echo "Checking node_modules permissions..."
    if [ ! -w "node_modules" ]; then
        echo "Fixing node_modules permissions..."
        sudo chown -R ubuntu:ubuntu node_modules/
        chmod -R 755 node_modules/
    fi
fi

# Ensure the current directory has proper permissions
sudo chown -R ubuntu:ubuntu .
chmod -R 755 .

echo "Build permissions fixed successfully!"
echo "You can now run the build process again." 