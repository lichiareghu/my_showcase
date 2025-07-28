# GitHub Deployment Script Guide

This guide explains how to use the `github-deploy.sh` script to automatically deploy your portfolio website from GitHub.

## 🚀 Overview

The `github-deploy.sh` script automates the entire deployment process:
1. **GitHub Authentication** - Validates your GitHub credentials
2. **Repository Management** - Clones or pulls your repository
3. **Deployment** - Runs the deployment script automatically
4. **Status Monitoring** - Provides deployment status and logs

## 📋 Prerequisites

### 1. GitHub Personal Access Token (Optional for Public Repositories)
For public repositories, a GitHub Personal Access Token is **optional** but recommended to avoid rate limiting.

**If you want to use a token (recommended):**
- `repo` - Full control of private repositories
- `read:user` - Read access to user profile

**To create a token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select the required permissions
4. Copy the token (you won't see it again!)

**Note:** For public repositories, you can deploy without a token, but you may hit GitHub's rate limits for anonymous access.

### 2. Server Requirements
- Linux server (Ubuntu/Debian recommended)
- SSH access to server
- Internet connection
- Sudo privileges (for automatic installation of Git and curl)

**Note:** Git and curl will be automatically installed if not present.

## 🛠️ Setup Instructions

### Step 1: Upload Scripts to Server
```bash
# Upload the deployment scripts to your server
scp github-deploy.sh deploy.sh user@your-server-ip:/path/to/deployment/
```

### Step 2: Make Scripts Executable
```bash
ssh user@your-server-ip
cd /path/to/deployment/
chmod +x github-deploy.sh deploy.sh
```

### Step 3: Create Environment Configuration
```bash
# Create environment template
./github-deploy.sh --setup

# Copy and edit the template
cp .github-deploy.env.template .github-deploy.env
nano .github-deploy.env
```

### Step 4: Configure Environment File
Edit `.github-deploy.env` with your details:
```env
# GitHub Credentials
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=ghp_your_personal_access_token_here_optional
GITHUB_REPO=your_username/your_repository_name
GITHUB_BRANCH=main

# Project Configuration
PROJECT_DIR=portfolio-showcase
DEPLOY_SCRIPT=deploy.sh

# Optional: Domain for SSL (set in deploy.sh)
# DOMAIN=yourdomain.com

# Note: For public repositories, GITHUB_TOKEN is optional
# but recommended to avoid rate limiting
```

### Step 5: Validate Configuration
```bash
# Test your GitHub credentials and repository access
./github-deploy.sh --validate
```

### Step 6: Deploy
```bash
# Run the full deployment
./github-deploy.sh --deploy
```

## 📖 Script Commands

### Main Commands
```bash
# Deploy the application (default)
./github-deploy.sh --deploy

# Show deployment status
./github-deploy.sh --status

# Setup environment template
./github-deploy.sh --setup

# Validate GitHub credentials
./github-deploy.sh --validate

# Show help
./github-deploy.sh --help
```

### What Each Command Does

#### `--deploy`
- Validates GitHub credentials
- Checks repository access
- Clones or pulls latest code
- Runs deployment script
- Shows deployment status

#### `--status`
- Shows current deployment status
- Displays PM2 process status
- Shows database and service status

#### `--setup`
- Creates `.github-deploy.env.template`
- Provides configuration instructions

#### `--validate`
- Tests GitHub token validity
- Verifies repository access
- Checks environment variables

## 🔄 Deployment Process

### First Time Deployment
1. **Authentication** - Validates GitHub credentials
2. **Repository Clone** - Downloads your repository
3. **Environment Setup** - Creates configuration files
4. **Dependencies** - Installs Node.js, PostgreSQL, etc.
5. **Database Setup** - Creates database and user
6. **Application Build** - Builds the React application
7. **Service Start** - Starts with PM2 process manager
8. **Status Check** - Verifies everything is running

### Subsequent Deployments
1. **Repository Update** - Pulls latest changes
2. **Dependencies** - Updates npm packages
3. **Application Build** - Rebuilds with new code
4. **Database Update** - Updates schema if needed
5. **Service Restart** - Restarts with new version
6. **Status Check** - Verifies deployment success

## 🔒 Security Features

### GitHub Token Security
- **Token Validation** - Verifies token before use
- **Repository Access Check** - Confirms repository permissions
- **Secure Storage** - Stores credentials in environment file

### Deployment Security
- **Error Handling** - Exits on any error
- **Validation Steps** - Multiple validation checkpoints
- **Logging** - Comprehensive logging for troubleshooting

## 📊 Monitoring & Logs

### Deployment Logs
```bash
# View deployment logs
./github-deploy.sh --status

# View application logs
cd portfolio-showcase
./deploy.sh --logs
```

### GitHub API Logs
The script validates GitHub access and shows:
- Token validity
- Repository access
- User authentication

## 🔧 Configuration Options

### Environment Variables
You can set these in `.github-deploy.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `GITHUB_USERNAME` | Your GitHub username | Required |
| `GITHUB_TOKEN` | GitHub Personal Access Token | Optional (for public repos) |
| `GITHUB_REPO` | Repository (username/repo) | Required |
| `GITHUB_BRANCH` | Branch to deploy | `main` |
| `PROJECT_DIR` | Local project directory | `portfolio-showcase` |
| `DEPLOY_SCRIPT` | Deploy script name | `deploy.sh` |

### Customization Examples

#### Deploy Different Branch
```env
GITHUB_BRANCH=develop
```

#### Custom Project Directory
```env
PROJECT_DIR=my-portfolio
```

#### Different Deploy Script
```env
DEPLOY_SCRIPT=my-deploy.sh
```

## 🐛 Troubleshooting

### Common Issues

#### 1. GitHub Token Issues
```bash
# Error: Invalid GitHub token
./github-deploy.sh --validate
```
**Solution:**
- For public repositories: You can leave GITHUB_TOKEN empty
- For private repositories: Check token permissions (need `repo` access)
- Verify token hasn't expired
- Ensure token is copied correctly

#### 2. Repository Access Issues
```bash
# Error: Cannot access repository
./github-deploy.sh --validate
```
**Solution:**
- Check repository name format: `username/repository`
- Verify repository exists and is accessible
- Ensure token has repository permissions

#### 3. Git Installation Issues
```bash
# Error: Git installation failed
```
**Solution:**
- The script automatically installs Git and curl
- Ensure you have sudo privileges
- Check your internet connection
- Supported systems: Ubuntu/Debian, CentOS/RHEL, Fedora, Arch Linux, OpenSUSE

#### 4. Permission Issues
```bash
# Error: Permission denied
```
**Solution:**
```bash
chmod +x github-deploy.sh deploy.sh
```

### Debug Mode
For detailed debugging, you can run with verbose output:
```bash
bash -x ./github-deploy.sh --deploy
```

### Log Analysis
```bash
# Check GitHub deployment logs
tail -f /var/log/github-deploy.log

# Check application logs
cd portfolio-showcase
./deploy.sh --logs
```

## 🔄 Automation

### Cron Job Setup
To automatically deploy on schedule:
```bash
# Edit crontab
crontab -e

# Add line for daily deployment at 2 AM
0 2 * * * cd /path/to/deployment && ./github-deploy.sh --deploy >> /var/log/github-deploy.log 2>&1
```

### Webhook Integration
For automatic deployment on push:
1. Set up GitHub webhook to your server
2. Create webhook endpoint that runs the script
3. Configure webhook to trigger on push events

## 📈 Best Practices

### 1. Token Management
- Use tokens with minimal required permissions
- Rotate tokens regularly
- Store tokens securely in environment files

### 2. Repository Management
- Use specific branches for deployment
- Test changes before deploying to production
- Keep deployment scripts in version control

### 3. Monitoring
- Set up log monitoring
- Configure alerts for deployment failures
- Regular status checks

### 4. Backup
- Backup environment files
- Backup database regularly
- Keep deployment logs

## 🎉 Success Indicators

After successful deployment, you should see:
- ✅ GitHub token validation passed
- ✅ Repository access confirmed
- ✅ Repository cloned/updated successfully
- ✅ Deploy script found and executable
- ✅ Deployment completed successfully
- ✅ Application status shows running

Your portfolio will be available at:
- **Local**: `http://localhost:5000`
- **Domain**: `https://yourdomain.com` (if configured)

## 📞 Support

If you encounter issues:

1. **Run validation**: `./github-deploy.sh --validate`
2. **Check logs**: `./github-deploy.sh --status`
3. **Review this guide** for troubleshooting steps
4. **Check GitHub token permissions**
5. **Verify repository access**

The script provides detailed error messages and validation steps to help identify and resolve issues quickly. 