# DevSphere Frontend

A modern React-based frontend application for DevSphere, featuring user and admin dashboards with authentication, project management, event handling, and member management.

## Features

- **User Dashboard**: Home, events, members, and projects pages
- **Admin Panel**: Dashboard, login, events, members, and projects management
- **Authentication**: Secure login using Better Auth
- **Responsive Design**: Built with Tailwind CSS for mobile-first UI
- **Routing**: Client-side routing with React Router
- **UI Components**: Shadcn/ui components for consistent design

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Better Auth
- **UI Library**: Radix UI components
- **Icons**: Lucide React

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd devsphere-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Usage

- **User Routes**: Access the main application at `/` with pages for home, events, members, and projects.
- **Admin Routes**: Admin panel available at `/admin` with login and management pages.
- Ensure the backend server is running on `http://localhost:3000` for authentication to work.

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (Button, Input, etc.)
│   ├── UserLayout.tsx
│   ├── AdminLayout.tsx
│   └── ...
├── pages/
│   ├── user/        # User-facing pages
│   └── admin/       # Admin pages
├── lib/
│   ├── auth-client.ts
│   └── utils.ts
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
