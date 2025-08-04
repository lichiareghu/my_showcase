# Production Deployment Guide

This guide covers deploying the Portfolio Showcase application to production using Docker.

## Prerequisites

- Docker and Docker Compose installed on your server
- A PostgreSQL database (local or cloud-based)
- Domain name (optional, for SSL)

## Quick Deployment

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my_showcase
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables**
   Edit `.env` with your production settings:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   SESSION_SECRET=your-secure-random-string
   NODE_ENV=production
   PORT=5000
   ```

4. **Start the application**
   ```bash
   docker-compose up -d
   ```

5. **Set up database schema**
   ```bash
   docker-compose exec app npm run db:push
   ```

6. **Access your application**
   - Direct: http://your-server-ip:5000
   - With Nginx: http://your-server-ip (port 80)

## Database Options

### Cloud Database (Required)
This deployment uses an external PostgreSQL database. You can use:

1. **Neon Database** (Recommended): [neon.tech](https://neon.tech)
2. **Supabase**: [supabase.com](https://supabase.com)
3. **AWS RDS**: Amazon's managed PostgreSQL service
4. **Any other PostgreSQL service**

### Setup Steps:
1. Create a database instance
2. Get the connection string
3. Update `DATABASE_URL` in your `.env` file
4. The local PostgreSQL service is disabled in `docker-compose.yml`

## SSL/HTTPS Setup

If you have a domain name, you can set up SSL with Let's Encrypt:

1. **Update nginx.conf** with your domain
2. **Create SSL directory**
   ```bash
   mkdir ssl
   ```

3. **Get SSL certificate**
   ```bash
   certbot certonly --standalone -d yourdomain.com
   ```

4. **Copy certificates**
   ```bash
   cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/
   cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/
   ```

5. **Restart nginx**
   ```bash
   docker-compose restart nginx
   ```

## Monitoring and Maintenance

### View Logs
```bash
# Application logs
docker-compose logs -f app

# Database logs
docker-compose logs -f postgres

# Nginx logs
docker-compose logs -f nginx
```

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart app
```

### Backup Database
```bash
# Create backup (connect to your external database)
pg_dump "YOUR_DATABASE_URL" > backup.sql

# Restore backup
psql "YOUR_DATABASE_URL" < backup.sql
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Check if port 5000 is available: `netstat -tulpn | grep :5000`
   - Change port in `.env` and `docker-compose.yml`

2. **Database connection failed**
   - Verify `DATABASE_URL` in `.env`
   - Check if database is accessible from your server

3. **Build fails**
   - Ensure Docker has enough memory (at least 2GB)
   - Clear Docker cache: `docker system prune -a`

4. **Permission issues**
   - Ensure Docker user has proper permissions
   - Run: `sudo chown -R $USER:$USER .`

### Health Checks

Check if services are running:
```bash
docker-compose ps
```

Test application health:
```bash
curl http://localhost:5000/api/health
```

## Security Considerations

1. **Change default passwords** in `.env`
2. **Use strong session secrets**
3. **Configure firewall** to only allow necessary ports
4. **Keep dependencies updated**
5. **Use HTTPS in production**
6. **Regular backups** of database and files

## Performance Optimization

1. **Enable gzip compression** in nginx
2. **Use CDN** for static assets
3. **Optimize images** in the logos directory
4. **Monitor resource usage** with `docker stats`
5. **Scale horizontally** if needed by adding more app instances 