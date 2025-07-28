#!/bin/bash

# GitHub Deployment Script
# This script authenticates with GitHub, pulls the repository, and deploys the portfolio website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
GITHUB_USERNAME="lichiareghu@gmail.com"
GITHUB_TOKEN=""
GITHUB_REPO="lichiareghu/my_showcase"
GITHUB_BRANCH="main"
PROJECT_DIR="portfolio-showcase"
DEPLOY_SCRIPT="deploy.sh"

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

# Function to check and install curl
check_curl() {
    if ! command_exists curl; then
        print_warning "Curl is not installed. Installing curl..."
        
        # Detect OS and install curl
        if command_exists apt-get; then
            # Ubuntu/Debian
            print_status "Installing curl using apt-get..."
            sudo apt-get update
            sudo apt-get install -y curl
        elif command_exists yum; then
            # CentOS/RHEL
            print_status "Installing curl using yum..."
            sudo yum install -y curl
        elif command_exists dnf; then
            # Fedora
            print_status "Installing curl using dnf..."
            sudo dnf install -y curl
        elif command_exists pacman; then
            # Arch Linux
            print_status "Installing curl using pacman..."
            sudo pacman -S --noconfirm curl
        elif command_exists zypper; then
            # OpenSUSE
            print_status "Installing curl using zypper..."
            sudo zypper install -y curl
        else
            print_error "Could not detect package manager. Please install curl manually."
            exit 1
        fi
        
        # Verify installation
        if command_exists curl; then
            CURL_VERSION=$(curl --version | head -n1)
            print_success "Curl installed successfully: $CURL_VERSION"
        else
            print_error "Curl installation failed"
            exit 1
        fi
    else
        CURL_VERSION=$(curl --version | head -n1)
        print_success "Curl is already installed: $CURL_VERSION"
    fi
}

# Function to check and install git
check_git() {
    if ! command_exists git; then
        print_warning "Git is not installed. Installing git..."
        
        # Detect OS and install git
        if command_exists apt-get; then
            # Ubuntu/Debian
            print_status "Installing git using apt-get..."
            sudo apt-get update
            sudo apt-get install -y git
        elif command_exists yum; then
            # CentOS/RHEL
            print_status "Installing git using yum..."
            sudo yum install -y git
        elif command_exists dnf; then
            # Fedora
            print_status "Installing git using dnf..."
            sudo dnf install -y git
        elif command_exists pacman; then
            # Arch Linux
            print_status "Installing git using pacman..."
            sudo pacman -S --noconfirm git
        elif command_exists zypper; then
            # OpenSUSE
            print_status "Installing git using zypper..."
            sudo zypper install -y git
        else
            print_error "Could not detect package manager. Please install git manually."
            print_status "Supported systems: Ubuntu/Debian, CentOS/RHEL, Fedora, Arch Linux, OpenSUSE"
            exit 1
        fi
        
        # Verify installation
        if command_exists git; then
            GIT_VERSION=$(git --version)
            print_success "Git installed successfully: $GIT_VERSION"
        else
            print_error "Git installation failed"
            exit 1
        fi
    else
        GIT_VERSION=$(git --version)
        print_success "Git is already installed: $GIT_VERSION"
    fi
}

# Function to setup GitHub credentials
setup_github_credentials() {
    print_status "Setting up GitHub credentials..."
    
    # For public repositories, we can use anonymous access or minimal credentials
    if [ -z "$GITHUB_USERNAME" ]; then
        print_warning "GitHub username not found in script variables"
        print_status "Please provide your GitHub username (for git config):"
        
        read -p "GitHub Username: " GITHUB_USERNAME
        
        if [ -z "$GITHUB_USERNAME" ]; then
            print_error "GitHub username is required for git configuration"
            exit 1
        fi
    fi
    
    # Configure git with GitHub username (token is optional for public repos)
    git config --global user.name "$GITHUB_USERNAME"
    git config --global user.email "$GITHUB_USERNAME@users.noreply.github.com"
    
    # Only configure token if provided (for rate limiting and private repos)
    if [ ! -z "$GITHUB_TOKEN" ]; then
        git config --global credential.helper store
        print_success "GitHub credentials configured with token"
    else
        print_success "GitHub credentials configured (public repository mode)"
    fi
}

# Function to get repository URL
get_repo_url() {
    if [ -z "$GITHUB_REPO" ]; then
        print_status "Please provide your GitHub repository:"
        read -p "Repository (format: username/repository): " GITHUB_REPO
        
        if [ -z "$GITHUB_REPO" ]; then
            print_error "Repository is required"
            exit 1
        fi
    fi
    
    # Construct repository URL (with or without token for public repos)
    if [ ! -z "$GITHUB_TOKEN" ]; then
        REPO_URL="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git"
        print_success "Repository URL configured with token: ${GITHUB_REPO}"
    else
        REPO_URL="https://github.com/${GITHUB_REPO}.git"
        print_success "Repository URL configured (public): ${GITHUB_REPO}"
    fi
}

# Function to clone or pull repository
clone_or_pull_repo() {
    print_status "Checking repository status..."
    
    if [ -d "$PROJECT_DIR" ]; then
        print_status "Repository directory exists, pulling latest changes..."
        cd "$PROJECT_DIR"
        
        # Configure remote (with or without token for public repos)
        if [ ! -z "$GITHUB_TOKEN" ]; then
            git remote set-url origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git"
        else
            git remote set-url origin "https://github.com/${GITHUB_REPO}.git"
        fi
        
        # Fetch latest changes
        git fetch origin
        
        # Check if we're on the correct branch
        CURRENT_BRANCH=$(git branch --show-current)
        if [ "$CURRENT_BRANCH" != "$GITHUB_BRANCH" ]; then
            print_status "Switching to branch: $GITHUB_BRANCH"
            git checkout "$GITHUB_BRANCH"
        fi
        
        # Pull latest changes
        git pull origin "$GITHUB_BRANCH"
        print_success "Repository updated successfully"
    else
        print_status "Cloning repository..."
        if [ ! -z "$GITHUB_TOKEN" ]; then
            git clone -b "$GITHUB_BRANCH" "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" "$PROJECT_DIR"
        else
            git clone -b "$GITHUB_BRANCH" "https://github.com/${GITHUB_REPO}.git" "$PROJECT_DIR"
        fi
        cd "$PROJECT_DIR"
        print_success "Repository cloned successfully"
    fi
}

# Function to check if deploy script exists
check_deploy_script() {
    if [ ! -f "$DEPLOY_SCRIPT" ]; then
        print_error "Deploy script '$DEPLOY_SCRIPT' not found in repository"
        print_status "Make sure the deploy.sh script is in your repository root"
        exit 1
    fi
    
    # Make deploy script executable
    chmod +x "$DEPLOY_SCRIPT"
    print_success "Deploy script found and made executable"
}

# Function to run deployment
run_deployment() {
    print_status "Starting deployment process..."
    
    # Check if this is a fresh installation or update
    if [ -f ".env" ]; then
        print_status "Environment file exists, running update deployment..."
        ./"$DEPLOY_SCRIPT" --update
    else
        print_status "Fresh installation detected, running full deployment..."
        ./"$DEPLOY_SCRIPT" --install
        ./"$DEPLOY_SCRIPT" --deploy
    fi
    
    print_success "Deployment completed successfully!"
}

# Function to show deployment status
show_deployment_status() {
    print_status "Checking deployment status..."
    
    if [ -f "$DEPLOY_SCRIPT" ]; then
        ./"$DEPLOY_SCRIPT" --status
    else
        print_warning "Deploy script not found, cannot check status"
    fi
}

# Function to setup environment variables from file
load_env_vars() {
    if [ -f ".github-deploy.env" ]; then
        print_status "Loading environment variables from .github-deploy.env"
        export $(cat .github-deploy.env | grep -v '^#' | xargs)
    fi
}

# Function to create environment template
create_env_template() {
    print_status "Creating environment template..."
    
    cat > .github-deploy.env.template << EOF
# GitHub Deployment Configuration
# Copy this file to .github-deploy.env and fill in your values

# GitHub Credentials (Token is optional for public repositories)
GITHUB_USERNAME=lichiareghu@gmail.com
GITHUB_TOKEN=your_github_personal_access_token_optional
GITHUB_REPO=lichiareghu/my_showcase
GITHUB_BRANCH=main

# Project Configuration
PROJECT_DIR=portfolio-showcase
DEPLOY_SCRIPT=deploy.sh

# Optional: Domain for SSL (set in deploy.sh)
# DOMAIN=yourdomain.com

# Note: For public repositories, GITHUB_TOKEN is optional
# but recommended to avoid rate limiting
EOF
    
    print_success "Environment template created: .github-deploy.env.template"
    print_warning "Copy this file to .github-deploy.env and fill in your values"
    print_status "For public repositories, GITHUB_TOKEN is optional but recommended"
}

# Function to validate GitHub token (optional for public repos)
validate_github_token() {
    if [ -z "$GITHUB_TOKEN" ]; then
        print_warning "No GitHub token provided - using public repository access"
        print_status "Note: Rate limits may apply for anonymous access"
        return 0
    fi
    
    print_status "Validating GitHub token..."
    
    # Test GitHub API access
    RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
    
    if echo "$RESPONSE" | grep -q "login"; then
        USERNAME=$(echo "$RESPONSE" | grep -o '"login":"[^"]*"' | cut -d'"' -f4)
        print_success "GitHub token is valid for user: $USERNAME"
    else
        print_error "Invalid GitHub token or API access denied"
        print_status "Please check your GitHub Personal Access Token"
        print_status "You can continue without a token for public repositories"
        exit 1
    fi
}

# Function to check repository access
check_repo_access() {
    print_status "Checking repository access..."
    
    # Test repository access (with or without token for public repos)
    if [ ! -z "$GITHUB_TOKEN" ]; then
        RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$GITHUB_REPO")
    else
        RESPONSE=$(curl -s "https://api.github.com/repos/$GITHUB_REPO")
    fi
    
    if echo "$RESPONSE" | grep -q "full_name"; then
        REPO_NAME=$(echo "$RESPONSE" | grep -o '"full_name":"[^"]*"' | cut -d'"' -f4)
        REPO_PRIVATE=$(echo "$RESPONSE" | grep -o '"private":[^,]*' | cut -d':' -f2)
        
        if [ "$REPO_PRIVATE" = "true" ]; then
            print_warning "Repository is private - token is required"
            if [ -z "$GITHUB_TOKEN" ]; then
                print_error "Cannot access private repository without token"
                exit 1
            fi
        fi
        
        print_success "Repository access confirmed: $REPO_NAME"
    else
        print_error "Cannot access repository: $GITHUB_REPO"
        print_status "Please check your repository name and permissions"
        exit 1
    fi
}

# Function to display help
show_help() {
    echo "GitHub Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --deploy        Deploy the application (default)"
    echo "  --status        Show deployment status"
    echo "  --setup         Setup environment template"
    echo "  --validate      Validate GitHub credentials"
    echo "  --help          Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  GITHUB_USERNAME     Your GitHub username (required)"
    echo "  GITHUB_TOKEN        Your GitHub Personal Access Token (optional for public repos)"
    echo "  GITHUB_REPO         Repository (format: username/repository)"
    echo "  GITHUB_BRANCH       Branch to deploy (default: main)"
    echo "  PROJECT_DIR         Project directory (default: portfolio-showcase)"
    echo "  DEPLOY_SCRIPT       Deploy script name (default: deploy.sh)"
    echo ""
    echo "Setup Instructions:"
    echo "  1. Run: $0 --setup"
    echo "  2. Copy .github-deploy.env.template to .github-deploy.env"
    echo "  3. Fill in your GitHub username and repository in .github-deploy.env"
    echo "  4. (Optional) Add GitHub token to avoid rate limiting"
    echo "  5. Run: $0 --deploy"
}

# Function to validate environment
validate_environment() {
    print_status "Validating environment..."
    
    # Check required variables
    if [ -z "$GITHUB_USERNAME" ]; then
        print_error "GITHUB_USERNAME is required for git configuration"
        exit 1
    fi
    
    if [ -z "$GITHUB_REPO" ]; then
        print_error "GITHUB_REPO is required"
        exit 1
    fi
    
    # Token is optional for public repositories
    if [ -z "$GITHUB_TOKEN" ]; then
        print_warning "GITHUB_TOKEN not provided - using public repository access"
        print_status "Note: Rate limits may apply for anonymous access"
    fi
    
    print_success "Environment validation passed"
}

# Main execution
main() {
    case "${1:-}" in
        --deploy)
            print_status "Starting GitHub deployment process..."
            load_env_vars
            check_curl
            check_git
            validate_environment
            validate_github_token
            check_repo_access
            setup_github_credentials
            get_repo_url
            clone_or_pull_repo
            check_deploy_script
            run_deployment
            show_deployment_status
            print_success "GitHub deployment completed successfully!"
            ;;
        --status)
            load_env_vars
            if [ -d "$PROJECT_DIR" ]; then
                cd "$PROJECT_DIR"
                show_deployment_status
            else
                print_warning "Project directory not found. Run deployment first."
            fi
            ;;
        --setup)
            create_env_template
            ;;
        --validate)
            load_env_vars
            check_curl
            check_git
            validate_environment
            validate_github_token
            check_repo_access
            print_success "All validations passed!"
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