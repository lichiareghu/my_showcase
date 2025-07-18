# Portfolio Website - Replit Development Guide

## Overview

This is a modern full-stack portfolio website built with React and Express, featuring a clean design for showcasing professional experience, education, projects, and skills. The application uses a monorepo structure with shared TypeScript types and includes a complete UI component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Radix UI primitives with custom styling (shadcn/ui)
- **State Management**: React Query for server state, React hooks for local state
- **Build Tool**: Vite for development and production builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot reload with Vite integration
- **Production**: Compiled with esbuild

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Provider**: Neon Database (@neondatabase/serverless)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared between client and server in `/shared/schema.ts`

## Key Components

### Project Structure
```
/client          # React frontend application
  /src
    /components  # Reusable UI components
    /pages       # Route-based page components
    /hooks       # Custom React hooks
    /lib         # Utility functions and configurations
/server          # Express backend application
  /routes.ts     # API route definitions
  /storage.ts    # Database abstraction layer
  /vite.ts       # Development server integration
/shared          # Shared TypeScript types and schemas
/components.json # shadcn/ui configuration
```

### UI Component System
- Complete shadcn/ui component library with consistent styling
- Radix UI primitives for accessibility and keyboard navigation
- Custom theme system with CSS variables for light/dark modes
- Responsive design with mobile-first approach

### Page Components
- **Home**: Landing page with hero section and featured projects
- **About**: Personal information, skills, and interests
- **Portfolio**: Project showcase with filtering and detailed views
- **Experience**: Professional work history with achievements
- **Education**: Academic background and certifications
- **Contact**: Contact form with validation

### Storage Interface
- Abstract storage interface (`IStorage`) for database operations
- Memory storage implementation for development
- User management with PostgreSQL schema
- Extensible CRUD operations

## Data Flow

### Client-Server Communication
1. React Query handles all server state management
2. Custom `apiRequest` function for HTTP requests with error handling
3. Form submissions use React Hook Form with Zod validation
4. Real-time updates through React Query's cache invalidation

### Database Operations
1. Drizzle ORM provides type-safe database queries
2. Schema definitions in `/shared/schema.ts` ensure consistency
3. Database operations abstracted through storage interface
4. Migrations managed with Drizzle Kit

### Development Workflow
1. Vite dev server handles frontend development
2. Express server runs concurrently with API routes
3. Hot reload for both frontend and backend changes
4. TypeScript compilation with strict mode enabled

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon Database
- **Authentication**: Session-based with PostgreSQL storage
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting

### Development Tools
- **Replit Integration**: Custom plugins for development environment
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking

### UI Enhancement
- **Animations**: CSS transitions and Tailwind animations
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Accessibility**: ARIA attributes and keyboard navigation support

## Deployment Strategy

### Development Environment
- Vite development server with hot reload
- Express server with middleware for API routes
- PostgreSQL database with environment-based configuration
- Replit-specific optimizations for cloud development

### Production Build
- Vite builds static assets to `/dist/public`
- esbuild compiles server code to `/dist/index.js`
- Single Node.js process serves both static files and API routes
- Environment variables for database connection and configuration

### Database Management
- Drizzle migrations for schema updates
- Environment-based database URL configuration
- Connection pooling through Neon Database driver
- Session storage in PostgreSQL for scalability

### Key Features
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Code splitting and lazy loading
- **Security**: Input validation and sanitization
- **Monitoring**: Request logging and error tracking
- **Scalability**: Stateless server design with database sessions