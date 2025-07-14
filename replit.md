# FlexDev API Hub

## Overview

This is a comprehensive full-stack API documentation platform built with React frontend and Express backend. The platform provides multiple APIs including media download services (YouTube, TikTok) and AI chat services (DeepAI, BlackBox AI). The project uses modern technologies including TypeScript, Tailwind CSS, shadcn/ui components, and includes interactive API testing capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Pattern**: RESTful API design
- **External Integration**: YouTube download via clipto.com proxy

### Database Schema
The application uses two main tables:
- `users`: User authentication and management
- `api_requests`: API usage tracking and analytics

## Key Components

### Frontend Components
- **Home Page**: Main landing page with API documentation and tester
- **API Tester**: Interactive component for testing YouTube download API
- **Code Block**: Component for displaying API usage examples
- **Layout Components**: Header and sidebar for navigation
- **UI Components**: Comprehensive shadcn/ui component library

### Backend Services
- **Media Download APIs**: 
  - YouTube Download API: Proxy service for downloading YouTube videos via clipto.com
  - TikTok Download API: Service for downloading TikTok videos via ssstik.io with metadata extraction
  - Facebook Download API: Service for downloading Facebook videos via fdownloader.net with metadata extraction
  - Twitter/X Download API: Service for downloading Twitter/X videos via ssstwitter.com with metadata extraction
- **AI Chat APIs**:
  - DeepAI Chat API: Natural language processing and conversation
  - BlackBox AI API: Advanced coding assistance and technical problem-solving
- **API Analytics**: Request logging and statistics tracking for all endpoints
- **User Management**: Basic user authentication system
- **Storage Layer**: Abstracted storage interface with in-memory implementation

## Data Flow

1. **Frontend Request**: User interacts with React components
2. **API Call**: TanStack Query manages HTTP requests to Express backend
3. **Backend Processing**: Express routes handle business logic
4. **External Service**: YouTube download requests proxied to clipto.com
5. **Database Logging**: API requests logged for analytics
6. **Response**: Data returned through React Query to frontend components

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority
- **Utilities**: Axios for HTTP requests, date-fns for date handling

### Backend Dependencies
- **Server**: Express.js, axios for external API calls
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session**: connect-pg-simple for PostgreSQL session store
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Build and Development
- **Vite**: Frontend build tool and dev server
- **TypeScript**: Type checking and compilation
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- Frontend served by Vite dev server with HMR
- Backend runs with tsx for TypeScript execution
- Database migrations managed by Drizzle Kit
- Environment-specific configuration through NODE_ENV

### Production
- Frontend built to static files with Vite
- Backend compiled to JavaScript with esbuild
- Single server serves both static files and API
- PostgreSQL database with connection pooling
- Session persistence through database store

### Database Management
- Schema defined in shared TypeScript files
- Migrations generated and applied via Drizzle Kit
- Database URL configuration through environment variables
- Automatic schema validation with Zod

## Changelog

- July 06, 2025: Initial setup with YouTube Download API
- July 06, 2025: Added TikTok Download API with metadata extraction
- July 06, 2025: Added DeepAI Chat API for natural language processing
- July 06, 2025: Added BlackBox AI API for coding assistance
- July 06, 2025: Enhanced frontend with universal API tester component
- July 06, 2025: Updated sidebar to reflect active API categories (Media Download: 2, AI & ML: 2)
- July 06, 2025: Added Facebook Download API with metadata extraction and quality options
- July 06, 2025: Updated sidebar count (Media Download: 3, AI & ML: 2) - Total: 5 APIs
- July 06, 2025: Added Twitter/X Download API with metadata extraction and quality options
- July 06, 2025: Enhanced interface with more interactive card wrappers and live activity indicators
- July 06, 2025: Updated sidebar count (Media Download: 4, AI & ML: 2) - Total: 6 APIs

## User Preferences

Preferred communication style: Simple, everyday language.