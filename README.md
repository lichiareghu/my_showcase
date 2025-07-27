# Portfolio Showcase

A modern full-stack portfolio website built with React, Express, and PostgreSQL. Features a clean design for showcasing professional experience, education, projects, and skills.

## 🚀 Features

- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Full-Stack**: Express.js backend with PostgreSQL database
- **Type Safety**: Complete TypeScript implementation with shared types
- **Component Library**: shadcn/ui components with Radix UI primitives
- **Database**: Drizzle ORM with PostgreSQL for data persistence
- **Authentication**: Session-based authentication with Passport.js
- **Responsive Design**: Mobile-first approach with modern animations

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Wouter for routing
- React Query for state management
- React Hook Form with Zod validation

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- Drizzle ORM for database operations
- PostgreSQL with Neon Database
- Passport.js for authentication
- Express sessions with PostgreSQL storage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my_showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A secure random string for session encryption
   - `PORT`: Server port (default: 5000)

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗂️ Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route-based page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
├── server/                # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction
│   └── vite.ts            # Development integration
├── shared/                # Shared TypeScript types
│   └── schema.ts          # Database schema definitions
├── migrations/            # Database migrations (auto-generated)
└── dist/                  # Production build output
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `SESSION_SECRET` | Session encryption key | Required |

## 📝 Database Setup

This project uses PostgreSQL with Drizzle ORM. You can use:

1. **Local PostgreSQL**: Install PostgreSQL locally
2. **Neon Database**: Cloud PostgreSQL service (recommended for production)
3. **Docker**: Run PostgreSQL in a container

### Using Neon Database (Recommended)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to your `.env` file
4. Run `npm run db:push` to set up the schema

## 🎨 Customization

### Styling
- Edit `tailwind.config.ts` for theme customization
- Modify CSS variables in `client/src/index.css`
- Add new components in `client/src/components/`

### Content
- Update page content in `client/src/pages/`
- Modify database schema in `shared/schema.ts`
- Add new API routes in `server/routes.ts`

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.
