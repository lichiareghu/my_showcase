#!/bin/bash

# Restart Deployment Script
# This script cleans up PM2 processes and restarts the deployment

set -e

echo "Cleaning up PM2 processes..."

# Stop and delete any existing PM2 processes
pm2 stop portfolio-showcase 2>/dev/null || true
pm2 delete portfolio-showcase 2>/dev/null || true

# Remove old ecosystem config files
rm -f ecosystem.config.js
rm -f ecosystem.config.cjs
rm -f ecosystem.config.mjs

echo "PM2 processes cleaned up."

# Fix database permissions if needed
if [ -f "fix_db_permissions.sh" ]; then
    echo "Fixing database permissions..."
    chmod +x fix_db_permissions.sh
    ./fix_db_permissions.sh
fi

# Rebuild and deploy
echo "Rebuilding and deploying..."
npm run build
./deploy.sh --deploy

echo "Deployment restarted successfully!" 