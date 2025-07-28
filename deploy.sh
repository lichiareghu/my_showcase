#!/bin/bash

# Portfolio Website Deployment Script
# This script sets up and deploys the portfolio showcase website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="portfolio-showcase"
NODE_VERSION="18"
PORT="5000"
DOMAIN=""  # Set your domain here if you have one

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js
install_nodejs() {
    print_status "Installing Node.js $NODE_VERSION..."
    
    if command_exists node; then
        CURRENT_NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$CURRENT_NODE_VERSION" -ge "$NODE_VERSION" ]; then
            print_success "Node.js is already installed and up to date"
            return
        fi
    fi
    
    # Install Node.js using NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    print_success "Node.js $NODE_VERSION installed successfully"
}

# Function to install PostgreSQL
install_postgresql() {
    print_status "Installing PostgreSQL..."
    
    if command_exists psql; then
        print_success "PostgreSQL is already installed"
        return
    fi
    
    sudo apt-get update
    sudo apt-get install -y postgresql postgresql-contrib
    
    # Start and enable PostgreSQL
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    print_success "PostgreSQL installed and started"
}

# Function to setup database
setup_database() {
    print_status "Setting up database..."
    
    # Create database and user
    sudo -u postgres psql -c "CREATE DATABASE portfolio_db;"
    sudo -u postgres psql -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio_password';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"
    
    # Grant schema permissions
    sudo -u postgres psql -d portfolio_db -c "GRANT ALL ON SCHEMA public TO portfolio_user;"
    sudo -u postgres psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO portfolio_user;"
    sudo -u postgres psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO portfolio_user;"
    sudo -u postgres psql -d portfolio_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO portfolio_user;"
    sudo -u postgres psql -d portfolio_db -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO portfolio_user;"
    
    print_success "Database setup completed"
}

# Function to install PM2
install_pm2() {
    print_status "Installing PM2 process manager..."
    
    if command_exists pm2; then
        print_success "PM2 is already installed"
        return
    fi
    
    sudo npm install -g pm2
    
    print_success "PM2 installed successfully"
}

# Function to setup firewall
setup_firewall() {
    print_status "Setting up firewall..."
    
    sudo ufw allow ssh
    sudo ufw allow $PORT
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw --force enable
    
    print_success "Firewall configured"
}

# Function to create environment file
create_env_file() {
    print_status "Creating environment configuration..."
    
    cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"

# Server Configuration
PORT=$PORT
NODE_ENV=production

# Session Configuration
SESSION_SECRET="$(openssl rand -hex 32)"

# Optional: Add your domain if you have one
# DOMAIN="$DOMAIN"
EOF
    
    print_success "Environment file created"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    npm install
    
    print_success "Dependencies installed"
}

# Function to build the project
build_project() {
    print_status "Building the project..."
    
    npm run build
    
    print_success "Project built successfully"
}

# Function to setup PM2 ecosystem
setup_pm2() {
    print_status "Setting up PM2 ecosystem..."
    
    cat > ecosystem.config.mjs << EOF
export default {
  apps: [{
    name: '$PROJECT_NAME',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: $PORT
    },
    env_file: '.env',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
EOF
    
    # Create logs directory
    mkdir -p logs
    
    print_success "PM2 ecosystem configured"
}

# Function to start the application
start_application() {
    print_status "Starting the application..."
    
    # Push database schema
    npm run db:push
    
    # Start with PM2
    pm2 start ecosystem.config.mjs
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    pm2 startup
    
    print_success "Application started successfully"
}

# Function to setup Nginx (optional)
setup_nginx() {
    if [ -z "$DOMAIN" ]; then
        print_warning "No domain specified, skipping Nginx setup"
        return
    fi
    
    print_status "Setting up Nginx..."
    
    # Install Nginx
    sudo apt-get install -y nginx
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/$PROJECT_NAME > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    
    print_success "Nginx configured for domain: $DOMAIN"
}

# Function to setup SSL with Let's Encrypt (optional)
setup_ssl() {
    if [ -z "$DOMAIN" ]; then
        print_warning "No domain specified, skipping SSL setup"
        return
    fi
    
    print_status "Setting up SSL certificate..."
    
    # Install Certbot
    sudo apt-get install -y certbot python3-certbot-nginx
    
    # Get SSL certificate
    sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    print_success "SSL certificate installed"
}

# Function to display status
show_status() {
    print_status "Checking application status..."
    
    echo ""
    echo "=== Application Status ==="
    pm2 status
    
    echo ""
    echo "=== Database Status ==="
    sudo systemctl status postgresql --no-pager
    
    echo ""
    echo "=== Nginx Status ==="
    sudo systemctl status nginx --no-pager
    
    echo ""
    echo "=== Firewall Status ==="
    sudo ufw status
    
    echo ""
    echo "=== Application URLs ==="
    echo "Local: http://localhost:$PORT"
    if [ ! -z "$DOMAIN" ]; then
        echo "Domain: https://$DOMAIN"
    fi
}

# Function to display help
show_help() {
    echo "Portfolio Website Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --install     Install all dependencies and setup the environment"
    echo "  --deploy      Deploy the application"
    echo "  --start       Start the application"
    echo "  --stop        Stop the application"
    echo "  --restart     Restart the application"
    echo "  --status      Show application status"
    echo "  --logs        Show application logs"
    echo "  --update      Update the application"
    echo "  --help        Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  DOMAIN        Your domain name (optional, for SSL setup)"
    echo "  PORT          Port number (default: 5000)"
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    pm2 logs $PROJECT_NAME
}

# Function to stop application
stop_application() {
    print_status "Stopping the application..."
    pm2 stop $PROJECT_NAME
    print_success "Application stopped"
}

# Function to restart application
restart_application() {
    print_status "Restarting the application..."
    pm2 restart $PROJECT_NAME
    print_success "Application restarted"
}

# Function to update application
update_application() {
    print_status "Updating the application..."
    
    # Pull latest changes (if using git)
    if [ -d ".git" ]; then
        git pull origin main
    fi
    
    # Install dependencies
    npm install
    
    # Build the project
    npm run build
    
    # Push database schema
    npm run db:push
    
    # Restart the application
    pm2 restart $PROJECT_NAME
    
    print_success "Application updated successfully"
}

# Main execution
main() {
    case "${1:-}" in
        --install)
            print_status "Starting installation process..."
            install_nodejs
            install_postgresql
            setup_database
            install_pm2
            setup_firewall
            create_env_file
            install_dependencies
            build_project
            setup_pm2
            setup_nginx
            setup_ssl
            print_success "Installation completed successfully!"
            ;;
        --deploy)
            print_status "Starting deployment process..."
            install_dependencies
            build_project
            setup_pm2
            start_application
            print_success "Deployment completed successfully!"
            ;;
        --start)
            start_application
            ;;
        --stop)
            stop_application
            ;;
        --restart)
            restart_application
            ;;
        --status)
            show_status
            ;;
        --logs)
            show_logs
            ;;
        --update)
            update_application
            ;;
        --help|"")
            show_help
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 