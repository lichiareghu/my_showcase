#!/bin/bash

# Docker Scripts for Portfolio Showcase
# Usage: ./docker-scripts.sh [command]

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

case "${1:-}" in
    "build")
        print_info "Building production Docker image..."
        docker build -f Dockerfile.simple -t portfolio-showcase .
        print_success "Production image built successfully!"
        ;;
    "build-dev")
        print_info "Building development Docker image..."
        docker build -f Dockerfile.dev -t portfolio-showcase:dev .
        print_success "Development image built successfully!"
        ;;
    "up")
        print_info "Starting production environment..."
        docker-compose up -d
        print_success "Production environment started!"
        print_info "Access your app at: http://localhost:5000"
        ;;
    "up-dev")
        print_info "Starting development environment..."
        docker-compose -f docker-compose.dev.yml up -d
        print_success "Development environment started!"
        print_info "Access your app at: http://localhost:5000"
        print_info "Vite dev server at: http://localhost:5173"
        ;;
    "down")
        print_info "Stopping all containers..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
        print_success "All containers stopped!"
        ;;
    "logs")
        print_info "Showing application logs..."
        docker-compose logs -f app
        ;;
    "logs-dev")
        print_info "Showing development logs..."
        docker-compose -f docker-compose.dev.yml logs -f app
        ;;
    "db-push")
        print_info "Pushing database schema..."
        docker-compose exec app npm run db:push
        print_success "Database schema updated!"
        ;;
    "db-push-dev")
        print_info "Pushing database schema (dev)..."
        docker-compose -f docker-compose.dev.yml exec app npm run db:push
        print_success "Database schema updated!"
        ;;
    "clean")
        print_warning "Cleaning up Docker resources..."
        docker-compose down -v
        docker-compose -f docker-compose.dev.yml down -v
        docker system prune -f
        print_success "Cleanup completed!"
        ;;
    "restart")
        print_info "Restarting production environment..."
        docker-compose restart
        print_success "Production environment restarted!"
        ;;
    "restart-dev")
        print_info "Restarting development environment..."
        docker-compose -f docker-compose.dev.yml restart
        print_success "Development environment restarted!"
        ;;
    "help"|"")
        echo "Docker Scripts for Portfolio Showcase"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  build        Build production Docker image"
        echo "  build-dev    Build development Docker image"
        echo "  up           Start production environment"
        echo "  up-dev       Start development environment"
        echo "  down         Stop all containers"
        echo "  logs         Show production logs"
        echo "  logs-dev     Show development logs"
        echo "  db-push      Push database schema (production)"
        echo "  db-push-dev  Push database schema (development)"
        echo "  clean        Clean up Docker resources"
        echo "  restart      Restart production environment"
        echo "  restart-dev  Restart development environment"
        echo "  help         Show this help message"
        ;;
    *)
        print_warning "Unknown command: $1"
        echo "Run '$0 help' for available commands"
        exit 1
        ;;
esac 