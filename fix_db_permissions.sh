#!/bin/bash

# Fix Database Permissions Script
# This script fixes the PostgreSQL permissions for the portfolio_user

set -e

echo "Fixing database permissions for portfolio_user..."

# Grant schema permissions
sudo -u postgres psql -d portfolio_db -c "GRANT ALL ON SCHEMA public TO portfolio_user;"
sudo -u postgres psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO portfolio_user;"
sudo -u postgres psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;"
sudo -u postgres psql -d portfolio_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO portfolio_user;"
sudo -u postgres psql -d portfolio_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO portfolio_user;"

echo "Database permissions fixed successfully!"
echo "You can now run the deploy script again." 