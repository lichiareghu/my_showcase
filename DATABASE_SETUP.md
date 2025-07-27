# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Portfolio Showcase project.

## Option 1: Neon Database (Recommended - Free Cloud Database)

1. **Sign up for Neon**
   - Go to [neon.tech](https://neon.tech)
   - Create a free account
   - Create a new project

2. **Get your connection string**
   - In your Neon dashboard, click on your project
   - Go to "Connection Details"
   - Copy the connection string

3. **Update your .env file**
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

4. **Push the schema**
   ```bash
   npm run db:push
   ```

## Option 2: Local PostgreSQL

1. **Install PostgreSQL**
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

2. **Create a database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE portfolio_db;
   
   # Create user (optional)
   CREATE USER portfolio_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
   
   # Exit
   \q
   ```

3. **Update your .env file**
   ```env
   DATABASE_URL="postgresql://portfolio_user:your_password@localhost:5432/portfolio_db"
   ```

4. **Push the schema**
   ```bash
   npm run db:push
   ```

## Option 3: Docker PostgreSQL

1. **Create a docker-compose.yml file**
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:16
       environment:
         POSTGRES_DB: portfolio_db
         POSTGRES_USER: portfolio_user
         POSTGRES_PASSWORD: your_password
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```

3. **Update your .env file**
   ```env
   DATABASE_URL="postgresql://portfolio_user:your_password@localhost:5432/portfolio_db"
   ```

4. **Push the schema**
   ```bash
   npm run db:push
   ```

## Schema Overview

The database includes the following tables:

- **users**: User accounts and authentication
- **sessions**: User session management
- **projects**: Portfolio projects
- **experiences**: Work experience entries
- **education**: Educational background
- **skills**: Technical skills and competencies

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running
- Check your connection string format
- Verify username/password are correct
- Make sure the database exists

### Permission Issues
- Ensure your user has proper permissions
- Check if the database exists and is accessible

### SSL Issues (Neon Database)
- Make sure to include `?sslmode=require` in your connection string
- Some environments may require additional SSL configuration

## Next Steps

After setting up the database:

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the application**
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

3. **Add sample data**
   - The application will start with empty tables
   - You can add data through the admin interface or directly in the database

## Production Considerations

For production deployment:

1. **Use a managed database service** (Neon, Supabase, AWS RDS)
2. **Set up proper environment variables**
3. **Configure SSL connections**
4. **Set up database backups**
5. **Monitor database performance** 