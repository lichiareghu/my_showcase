# Portfolio Website Deployment Guide

This guide will help you deploy your portfolio website to a Linux server using the provided deployment script.

## 🚀 Quick Start

### Prerequisites
- Ubuntu/Debian Linux server (or any Linux distribution)
- SSH access to your server
- Domain name (optional, for SSL)

### 1. Upload Files to Server
```bash
# Upload your project files to the server
scp -r . user@your-server-ip:/path/to/portfolio/
```

### 2. SSH into Your Server
```bash
ssh user@your-server-ip
cd /path/to/portfolio/
```

### 3. Make Script Executable
```bash
chmod +x deploy.sh
```

### 4. Configure Domain (Optional)
Edit the script to set your domain:
```bash
nano deploy.sh
# Change this line:
DOMAIN=""  # Set your domain here if you have one
# To:
DOMAIN="yourdomain.com"
```

### 5. Run Installation
```bash
./deploy.sh --install
```

### 6. Deploy Application
```bash
./deploy.sh --deploy
```

## 📋 Deployment Script Commands

### Installation Commands
```bash
# Full installation (run once)
./deploy.sh --install

# Deploy application
./deploy.sh --deploy
```

### Management Commands
```bash
# Start the application
./deploy.sh --start

# Stop the application
./deploy.sh --stop

# Restart the application
./deploy.sh --restart

# Check status
./deploy.sh --status

# View logs
./deploy.sh --logs

# Update application
./deploy.sh --update

# Show help
./deploy.sh --help
```

## 🔧 What the Script Does

### Installation Process (`--install`)
1. **Installs Node.js 18** - Latest LTS version
2. **Installs PostgreSQL** - Database server
3. **Sets up Database** - Creates database and user
4. **Installs PM2** - Process manager for Node.js
5. **Configures Firewall** - Opens necessary ports
6. **Creates Environment File** - Sets up configuration
7. **Installs Dependencies** - npm install
8. **Builds Project** - npm run build
9. **Sets up PM2 Ecosystem** - Process management
10. **Configures Nginx** - Web server (if domain provided)
11. **Sets up SSL** - Let's Encrypt certificate (if domain provided)

### Deployment Process (`--deploy`)
1. **Installs Dependencies** - npm install
2. **Builds Project** - npm run build
3. **Sets up PM2** - Process management
4. **Starts Application** - Launches the server

## 🌐 Server Configuration

### Ports Used
- **5000** - Main application port
- **80** - HTTP (for Nginx)
- **443** - HTTPS (for SSL)
- **22** - SSH (already open)

### Database Configuration
- **Database**: `portfolio_db`
- **User**: `portfolio_user`
- **Password**: `portfolio_password`
- **Host**: `localhost`
- **Port**: `5432`

### Environment Variables
The script creates a `.env` file with:
```env
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"
PORT=5000
NODE_ENV=production
SESSION_SECRET="auto-generated-secret"
```

## 🔒 Security Features

### Firewall Configuration
- SSH access maintained
- Application port opened
- HTTP/HTTPS ports opened
- UFW firewall enabled

### SSL Certificate (with domain)
- Automatic Let's Encrypt certificate
- Auto-renewal configured
- HTTPS redirect enabled

### Database Security
- Local PostgreSQL installation
- Dedicated database user
- Restricted permissions

## 📊 Monitoring & Logs

### PM2 Process Manager
- **Auto-restart** on crashes
- **Load balancing** with multiple instances
- **Memory monitoring** (restart at 1GB)
- **Log management** in `./logs/` directory

### Log Files
- `./logs/err.log` - Error logs
- `./logs/out.log` - Output logs
- `./logs/combined.log` - Combined logs

### Status Monitoring
```bash
# Check application status
./deploy.sh --status

# View real-time logs
./deploy.sh --logs

# PM2 status
pm2 status
```

## 🔄 Updates & Maintenance

### Update Application
```bash
./deploy.sh --update
```

This will:
1. Pull latest changes (if using git)
2. Install new dependencies
3. Rebuild the project
4. Update database schema
5. Restart the application

### Manual Updates
```bash
# Pull changes
git pull origin main

# Install dependencies
npm install

# Build project
npm run build

# Update database
npm run db:push

# Restart application
pm2 restart portfolio-showcase
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :5000

# Kill the process
sudo kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Test connection
psql -U portfolio_user -d portfolio_db -h localhost
```

#### 3. PM2 Issues
```bash
# Check PM2 status
pm2 status

# Restart PM2
pm2 restart all

# Clear PM2 logs
pm2 flush
```

#### 4. Nginx Issues
```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Log Analysis
```bash
# Application logs
pm2 logs portfolio-showcase

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## 📈 Performance Optimization

### PM2 Configuration
- **Cluster mode** - Multiple instances
- **Auto-restart** - On crashes
- **Memory limit** - 1GB per instance
- **Load balancing** - Automatic

### Database Optimization
- **Connection pooling** - Built into Drizzle
- **Indexed queries** - Optimized schema
- **Local database** - Low latency

### Nginx Configuration
- **Proxy caching** - Static content
- **Gzip compression** - Reduced bandwidth
- **SSL termination** - Secure connections

## 🔧 Customization

### Change Port
Edit the script:
```bash
PORT="3000"  # Change from 5000 to your preferred port
```

### Change Database Password
Edit the script:
```bash
# In setup_database() function, change:
sudo -u postgres psql -c "CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';"
```

### Add Environment Variables
Edit the `create_env_file()` function to add your custom variables.

## 📞 Support

If you encounter issues:

1. **Check logs**: `./deploy.sh --logs`
2. **Check status**: `./deploy.sh --status`
3. **Review this guide** for troubleshooting steps
4. **Check system resources**: `htop`, `df -h`, `free -h`

## 🎉 Success!

After successful deployment, your portfolio will be available at:
- **Local**: `http://localhost:5000`
- **Domain**: `https://yourdomain.com` (if configured)

The application will automatically start on server reboot and restart on crashes. 