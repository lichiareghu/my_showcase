# AWS EC2 Deployment Guide

This guide will help you deploy your Portfolio Showcase application on AWS EC2 using the user data script.

## 🚀 Quick Deployment Steps

### 1. Launch EC2 Instance

1. **Go to AWS Console** → **EC2** → **Launch Instance**
2. **Choose AMI**: Ubuntu Server 22.04 LTS (HVM)
3. **Instance Type**: 
   - Minimum: `t3.small` (2 vCPU, 2 GB RAM)
   - Recommended: `t3.medium` (2 vCPU, 4 GB RAM)
   - For production: `t3.large` (2 vCPU, 8 GB RAM)
4. **Storage**: 20 GB GP3 SSD (minimum)
5. **Security Group**: Create new with these rules:
   - SSH (22): Your IP
   - HTTP (80): 0.0.0.0/0
   - HTTPS (443): 0.0.0.0/0
   - Custom TCP (5000): 0.0.0.0/0

### 2. Configure User Data

In the **Advanced Details** section, paste the content from `ec2-user-data.sh`:

```bash
#!/bin/bash
# Copy the entire content from ec2-user-data.sh here
```

### 3. Launch and Wait

1. **Launch** the instance
2. **Wait 10-15 minutes** for the deployment to complete
3. **Check the logs**: SSH into the instance and run:
   ```bash
   tail -f /var/log/portfolio-deployment.log
   ```

## 🔧 Configuration Options

### Environment Variables

Edit the `DOMAIN` variable in the user data script if you have a domain:

```bash
DOMAIN="yourdomain.com"  # Set your domain here
```

### Repository Configuration

Update these variables if needed:

```bash
GITHUB_REPO="lichiareghu/my_showcase"  # Your GitHub repository
GITHUB_BRANCH="main"                   # Branch to deploy
PROJECT_DIR="/opt/portfolio-showcase"  # Installation directory
```

## 📋 Post-Deployment Verification

### 1. Check Application Status

SSH into your EC2 instance and run:

```bash
portfolio-status.sh
```

### 2. Verify Services

```bash
# Check Docker containers
docker ps

# Check application logs
cd /opt/portfolio-showcase
./docker-scripts.sh logs

# Check system resources
htop
```

### 3. Access Your Application

- **Direct IP**: `http://YOUR_EC2_IP:5000`
- **Domain** (if configured): `https://yourdomain.com`

## 🛠️ Management Commands

### Application Management

```bash
# Check status
portfolio-status.sh

# View logs
cd /opt/portfolio-showcase
./docker-scripts.sh logs

# Restart application
cd /opt/portfolio-showcase
./docker-scripts.sh restart

# Update application
cd /opt/portfolio-showcase
git pull origin main
./docker-scripts.sh build
./docker-scripts.sh restart
```

### Backup and Restore

```bash
# Manual backup
portfolio-backup.sh

# View backups
ls -la /opt/backups/

# Restore database (if needed)
cd /opt/portfolio-showcase
docker-compose exec -T postgres psql -U portfolio_user portfolio_db < /opt/backups/db_backup_YYYYMMDD_HHMMSS.sql
```

### Monitoring

```bash
# View monitoring logs
tail -f /var/log/portfolio-monitor.log

# Check cron jobs
crontab -l

# View system logs
journalctl -u portfolio-showcase.service
```

## 🔒 Security Features

The deployment includes:

- **Firewall (UFW)**: Only allows SSH, HTTP, HTTPS, and port 5000
- **Fail2ban**: Protects against brute force attacks
- **SSL/TLS**: Automatic Let's Encrypt certificates (if domain provided)
- **Systemd service**: Auto-restart on failure
- **Monitoring**: Automatic service health checks every 5 minutes

## 📊 Monitoring and Alerts

### Automatic Monitoring

- **Service Health**: Checks every 5 minutes
- **Auto-restart**: Failed services are automatically restarted
- **Logging**: All activities logged to `/var/log/portfolio-deployment.log`

### Manual Monitoring

```bash
# Check system resources
htop
df -h
free -h

# Check application performance
docker stats

# Check network connections
netstat -tulpn
```

## 🔄 Updates and Maintenance

### Application Updates

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Update application
cd /opt/portfolio-showcase
git pull origin main
./docker-scripts.sh build
./docker-scripts.sh restart
```

### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Restart if needed
sudo reboot
```

## 🚨 Troubleshooting

### Common Issues

1. **Application not starting**:
   ```bash
   cd /opt/portfolio-showcase
   ./docker-scripts.sh logs
   ```

2. **Database connection issues**:
   ```bash
   docker-compose exec postgres psql -U portfolio_user -d portfolio_db
   ```

3. **Port conflicts**:
   ```bash
   sudo netstat -tulpn | grep :5000
   ```

4. **Permission issues**:
   ```bash
   sudo chown -R ubuntu:ubuntu /opt/portfolio-showcase
   ```

### Log Files

- **Deployment logs**: `/var/log/portfolio-deployment.log`
- **Application logs**: `cd /opt/portfolio-showcase && ./docker-scripts.sh logs`
- **System logs**: `journalctl -u portfolio-showcase.service`
- **Monitoring logs**: `/var/log/portfolio-monitor.log`

## 💰 Cost Optimization

### Instance Sizing

- **Development**: `t3.micro` (1 vCPU, 1 GB RAM) - ~$8/month
- **Small Production**: `t3.small` (2 vCPU, 2 GB RAM) - ~$16/month
- **Medium Production**: `t3.medium` (2 vCPU, 4 GB RAM) - ~$32/month

### Storage Optimization

- **GP3 SSD**: Better performance than GP2, same cost
- **EBS Optimization**: Enable for better I/O performance
- **Snapshot backups**: Regular snapshots for disaster recovery

## 🔐 Security Best Practices

1. **Use SSH keys** instead of passwords
2. **Restrict security groups** to specific IP ranges
3. **Regular updates**: Keep system and application updated
4. **Monitor logs**: Check for suspicious activities
5. **Backup regularly**: Use the automated backup system
6. **Use HTTPS**: Configure SSL certificates for production

## 📞 Support

If you encounter issues:

1. Check the logs: `/var/log/portfolio-deployment.log`
2. Verify the deployment completed successfully
3. Check system resources and Docker containers
4. Review the troubleshooting section above

For additional help, check the application logs and system status using the provided management commands. 