#!/bin/bash

# User Data Script for Portfolio Showcase Deployment
# This script runs on Ubuntu server startup to deploy the portfolio application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log file
LOG_FILE="/var/log/portfolio-deployment.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

print_status() {
    log_message "${BLUE}[INFO]${NC} $1"
}

print_success() {
    log_message "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    log_message "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    log_message "${RED}[ERROR]${NC} $1"
}

# Configuration
GITHUB_REPO="lichiareghu/my_showcase"
GITHUB_BRANCH="main"
PROJECT_DIR="/opt/portfolio-showcase"
DOMAIN=""  # Set your domain here if you have one

# Start deployment
log_message "=== Portfolio Showcase Deployment Started ==="

# Update system
print_status "Updating system packages..."
apt-get update -y
apt-get upgrade -y

# Install essential packages
print_status "Installing essential packages..."
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
print_status "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Fix Docker permissions for ubuntu user
print_status "Setting up Docker permissions..."
usermod -aG docker ubuntu
systemctl restart docker

# Install Node.js (for potential local development)
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Create application directory
print_status "Setting up application directory..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Clone repository
print_status "Cloning repository from GitHub..."
if [ -d ".git" ]; then
    print_status "Repository already exists, pulling latest changes..."
    git pull origin "$GITHUB_BRANCH"
else
    git clone -b "$GITHUB_BRANCH" "https://github.com/$GITHUB_REPO.git" .
fi

# Set proper permissions
print_status "Setting proper permissions..."
chown -R ubuntu:ubuntu "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Make Docker scripts executable
chmod +x docker-scripts.sh

# Verify Docker permissions
print_status "Verifying Docker permissions..."
# Switch to ubuntu user context to test Docker access
su - ubuntu -c "docker ps" || print_warning "Docker permissions verification failed, but continuing..."

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating environment file..."
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
fi

# Configure firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 5000

# Configure fail2ban
print_status "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Build and start the application
print_status "Building and starting the application..."
cd "$PROJECT_DIR"

# Build the Docker image (as ubuntu user)
su - ubuntu -c "cd $PROJECT_DIR && ./docker-scripts.sh build"

# Start the application (as ubuntu user)
su - ubuntu -c "cd $PROJECT_DIR && ./docker-scripts.sh up"

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Push database schema
print_status "Setting up database schema..."
su - ubuntu -c "cd $PROJECT_DIR && ./docker-scripts.sh db-push"

# Create systemd service for auto-restart
print_status "Creating systemd service for auto-restart..."
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
    print_status "Setting up SSL certificate for domain: $DOMAIN"
    
    # Install Certbot
    apt-get install -y certbot python3-certbot-nginx
    
    # Get SSL certificate
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN" || print_warning "SSL setup failed, continuing without SSL"
fi

# Create monitoring script
print_status "Creating monitoring script..."
cat > /usr/local/bin/portfolio-monitor.sh << 'EOF'
#!/bin/bash

# Portfolio Showcase Monitoring Script
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

# Check main application
check_service "Portfolio App" "portfolio_app"

# Check database
check_service "PostgreSQL" "portfolio_postgres"

# Check nginx (if running)
if docker ps | grep -q "portfolio_nginx"; then
    check_service "Nginx" "portfolio_nginx"
fi
EOF

chmod +x /usr/local/bin/portfolio-monitor.sh

# Setup cron job for monitoring
print_status "Setting up monitoring cron job..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/portfolio-monitor.sh") | crontab -

# Create backup script
print_status "Creating backup script..."
cat > /usr/local/bin/portfolio-backup.sh << 'EOF'
#!/bin/bash

# Portfolio Showcase Backup Script
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup database
cd /opt/portfolio-showcase
docker-compose exec -T postgres pg_dump -U portfolio_user portfolio_db > "$BACKUP_DIR/db_backup_$DATE.sql"

# Backup application files
tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" -C /opt portfolio-showcase --exclude=node_modules --exclude=dist

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/portfolio-backup.sh

# Setup daily backup cron job
print_status "Setting up daily backup cron job..."
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/portfolio-backup.sh") | crontab -

# Create status check script
print_status "Creating status check script..."
cat > /usr/local/bin/portfolio-status.sh << 'EOF'
#!/bin/bash

# Portfolio Showcase Status Script
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
print_status "Performing final status check..."
sleep 10

# Check if containers are running
if docker ps | grep -q "portfolio_app"; then
    print_success "Portfolio application is running successfully!"
else
    print_error "Portfolio application failed to start properly"
    exit 1
fi

# Display access information
print_success "=== Deployment Completed Successfully! ==="
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