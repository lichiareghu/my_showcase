#!/bin/bash

# EC2 User Data Script for Portfolio Showcase
# Copy this content to your EC2 instance user data field

set -e

# Configuration
GITHUB_REPO="lichiareghu/my_showcase"
GITHUB_BRANCH="main"
PROJECT_DIR="/opt/portfolio-showcase"
DOMAIN=""  # Set your domain here if you have one

# Log file
LOG_FILE="/var/log/portfolio-deployment.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Start deployment
log_message "=== Portfolio Showcase Deployment Started ==="

# Update system
log_message "Updating system packages..."
apt-get update -y
apt-get upgrade -y

# Install essential packages
log_message "Installing essential packages..."
apt-get install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release ufw fail2ban

# Install Docker
log_message "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
log_message "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Node.js
log_message "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Create application directory
log_message "Setting up application directory..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Clone repository
log_message "Cloning repository from GitHub..."
git clone -b "$GITHUB_BRANCH" "https://github.com/$GITHUB_REPO.git" .

# Set proper permissions
log_message "Setting proper permissions..."
chown -R ubuntu:ubuntu "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Make Docker scripts executable
chmod +x docker-scripts.sh

# Create environment file
log_message "Creating environment file..."
cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"

# Server Configuration
PORT=5000
NODE_ENV=production

# Session Configuration
SESSION_SECRET="$(openssl rand -hex 32)"

# Optional: Add your domain if you have one
# DOMAIN="$DOMAIN"
EOF

chown ubuntu:ubuntu .env
chmod 600 .env

# Configure firewall
log_message "Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 5000

# Configure fail2ban
log_message "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Build and start the application
log_message "Building and starting the application..."
cd "$PROJECT_DIR"

# Build the Docker image
./docker-scripts.sh build

# Start the application
./docker-scripts.sh up

# Wait for services to be ready
log_message "Waiting for services to be ready..."
sleep 30

# Push database schema
log_message "Setting up database schema..."
./docker-scripts.sh db-push

# Create systemd service for auto-restart
log_message "Creating systemd service for auto-restart..."
cat > /etc/systemd/system/portfolio-showcase.service << EOF
[Unit]
Description=Portfolio Showcase Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/bin/bash -c 'cd $PROJECT_DIR && ./docker-scripts.sh up'
ExecStop=/bin/bash -c 'cd $PROJECT_DIR && ./docker-scripts.sh down'
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reload
systemctl enable portfolio-showcase.service

# Setup SSL with Let's Encrypt (if domain is provided)
if [ ! -z "$DOMAIN" ]; then
    log_message "Setting up SSL certificate for domain: $DOMAIN"
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN" || log_message "SSL setup failed, continuing without SSL"
fi

# Create monitoring script
log_message "Creating monitoring script..."
cat > /usr/local/bin/portfolio-monitor.sh << 'EOF'
#!/bin/bash
LOG_FILE="/var/log/portfolio-monitor.log"

check_service() {
    local service_name="$1"
    local container_name="$2"
    
    if ! docker ps | grep -q "$container_name"; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') - $service_name is down, restarting..." >> "$LOG_FILE"
        cd /opt/portfolio-showcase
        ./docker-scripts.sh restart
    fi
}

check_service "Portfolio App" "portfolio_app"
check_service "PostgreSQL" "portfolio_postgres"

if docker ps | grep -q "portfolio_nginx"; then
    check_service "Nginx" "portfolio_nginx"
fi
EOF

chmod +x /usr/local/bin/portfolio-monitor.sh

# Setup cron job for monitoring
log_message "Setting up monitoring cron job..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/portfolio-monitor.sh") | crontab -

# Create backup script
log_message "Creating backup script..."
cat > /usr/local/bin/portfolio-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

cd /opt/portfolio-showcase
docker-compose exec -T postgres pg_dump -U portfolio_user portfolio_db > "$BACKUP_DIR/db_backup_$DATE.sql"

tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" -C /opt portfolio-showcase --exclude=node_modules --exclude=dist

find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/portfolio-backup.sh

# Setup daily backup cron job
log_message "Setting up daily backup cron job..."
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/portfolio-backup.sh") | crontab -

# Create status check script
log_message "Creating status check script..."
cat > /usr/local/bin/portfolio-status.sh << 'EOF'
#!/bin/bash
echo "=== Portfolio Showcase Status ==="
echo ""
echo "Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "Application Logs (last 10 lines):"
cd /opt/portfolio-showcase
./docker-scripts.sh logs | tail -10
echo ""
echo "System Resources:"
echo "CPU Usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
echo "Memory Usage: $(free | grep Mem | awk '{printf("%.2f%%", $3/$2 * 100.0)}')"
echo "Disk Usage: $(df / | tail -1 | awk '{print $5}')"
echo ""
echo "Services Status:"
systemctl is-active portfolio-showcase.service
echo ""
echo "Firewall Status:"
ufw status
EOF

chmod +x /usr/local/bin/portfolio-status.sh

# Final status check
log_message "Performing final status check..."
sleep 10

# Check if containers are running
if docker ps | grep -q "portfolio_app"; then
    log_message "Portfolio application is running successfully!"
else
    log_message "Portfolio application failed to start properly"
    exit 1
fi

# Display access information
log_message "=== Deployment Completed Successfully! ==="
echo ""
echo "Access Information:"
echo "  - Application: http://$(curl -s ifconfig.me):5000"
if [ ! -z "$DOMAIN" ]; then
    echo "  - Domain: https://$DOMAIN"
fi
echo ""
echo "Useful Commands:"
echo "  - Check status: portfolio-status.sh"
echo "  - View logs: cd $PROJECT_DIR && ./docker-scripts.sh logs"
echo "  - Restart app: cd $PROJECT_DIR && ./docker-scripts.sh restart"
echo "  - Backup: portfolio-backup.sh"
echo ""
echo "Log file: $LOG_FILE"

# Log completion
log_message "=== Portfolio Showcase Deployment Completed Successfully ===" 