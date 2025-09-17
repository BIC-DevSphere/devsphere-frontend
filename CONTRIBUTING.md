# Contributing to DevSphere Frontend

Welcome to the DevSphere Frontend project! This guide will help you understand our conventions, patterns, and best practices for contributing to this React/TypeScript application.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Component Conventions](#component-conventions)
- [Page Components](#page-components)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Routing & Navigation](#routing--navigation)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Styling Guidelines](#styling-guidelines)
- [Type Definitions](#type-definitions)
- [Code Style Guidelines](#code-style-guidelines)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn package manager
- Backend server running on `http://localhost:3000`

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components and layouts
│   ├── ui/             # Shadcn/ui components (Button, Input, etc.)
│   ├── UserLayout.tsx  # Layout wrapper for user pages
│   ├── AdminLayout.tsx # Layout wrapper for admin pages
│   ├── UserNavbar.tsx  # User navigation component
│   └── AdminSidebar.tsx# Admin sidebar component
├── pages/              # Page components organized by user type
│   ├── user/          # User-facing pages
│   └── admin/         # Admin panel pages
├── lib/               # Utility libraries and configurations
│   ├── auth-client.ts # Authentication client setup
│   └── utils.ts       # Common utility functions
├── App.tsx            # Main app component with routing
├── main.tsx           # Application entry point
├── index.css          # Global styles and Tailwind imports
└── vite-env.d.ts      # Vite type declarations
```

## Naming Conventions

### File Naming
- Use **PascalCase** for React component files: `UserHome.tsx`, `AdminLogin.tsx`
- Use **camelCase** for utility files: `auth-client.ts`, `utils.ts`
- Use **kebab-case** for configuration files: `vite.config.ts`, `tailwind.config.js`

### Component Naming
- Use **PascalCase** for component names: `UserNavbar`, `AdminLayout`
- Use **camelCase** for component instances and variables: `userHome`, `adminDashboard`
- Use descriptive names that indicate purpose: `UserLayout`, `AdminSidebar`

### Directory Naming
- Use **camelCase** for directories: `components/`, `pages/`
- Group related components: `pages/user/`, `pages/admin/`
- Use `ui/` for reusable UI components

## Component Conventions

### Functional Components

**ALL components should be functional components using modern React patterns:**

```typescript
import React from 'react';

const ExampleComponent = () => {
  return (
    <div>
      <h1>Example Component</h1>
    </div>
  );
};

export default ExampleComponent;
```

### Component Structure Template

```typescript
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { someUtility } from '@/lib/utils';
import type { ExampleProps } from '@/types/example.types';

interface ComponentProps {
  title: string;
  optional?: boolean;
}

const ExampleComponent: React.FC<ComponentProps> = ({ 
  title, 
  optional = false 
}) => {
  // 1. Hooks (useState, useEffect, custom hooks)
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Event handlers
  const handleClick = () => {
    // Handle click logic
  };

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 4. Early returns for loading/error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 5. Main render
  return (
    <div className="container">
      <h1>{title}</h1>
      <Button onClick={handleClick}>
        Click me
      </Button>
    </div>
  );
};

export default ExampleComponent;
```

### Props Interface

Always define props interfaces within the component file:

```typescript
interface UserCardProps {
  name: string;
  email: string;
  role?: 'admin' | 'user';
  onEdit?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, role = 'user', onEdit }) => {
  // Component implementation
};
```

## Page Components

Page components represent full pages and follow specific conventions.

### Page Component Structure

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const UserHome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // API call logic
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Home</h1>
      {/* Page content */}
    </div>
  );
};

export default UserHome;
```

### Page Organization

- **User pages**: Located in `src/pages/user/`
- **Admin pages**: Located in `src/pages/admin/`
- Each page should be a default export
- Use descriptive names: `UserHome`, `AdminDashboard`, `AdminLogin`

## Layout Components

Layout components wrap pages and provide consistent navigation and structure.

### Layout Structure

```typescript
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './UserNavbar';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
```

### Layout Conventions

- Use `<Outlet />` for nested route rendering
- Include navigation components (navbar, sidebar)
- Apply global layout styles and containers
- Handle responsive design at layout level

## UI Components

UI components are located in `src/components/ui/` and follow Shadcn/ui patterns.

## Routing & Navigation

### Route Configuration

Routes are configured in [`App.tsx`](src/App.tsx):

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from '@/components/UserLayout';
import AdminLayout from '@/components/AdminLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="members" element={<UserMembers />} />
          <Route path="projects" element={<UserProjects />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="projects" element={<AdminProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
```

### Navigation Patterns

- Use React Router's `useNavigate` for programmatic navigation
- Use `Link` component for declarative navigation
- Implement route guards for protected routes

```typescript
import { useNavigate, Link } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div>
      <Link to="/events">Events</Link>
      <button onClick={handleNavigation}>Go to Admin</button>
    </div>
  );
};
```

## State Management

### Local State

Use `useState` for component-level state:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [user, setUser] = useState<User | null>(null);
const [formData, setFormData] = useState({
  name: '',
  email: '',
});
```

### Form State

Use controlled components for forms:

```typescript
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

return (
  <Input
    name="email"
    value={formData.email}
    onChange={handleInputChange}
  />
);
```

## Authentication

Authentication is handled using Better Auth client from [`@/lib/auth-client`](src/lib/auth-client.ts).

### Authentication Usage

```typescript
import { authClient } from '@/lib/auth-client';

const LoginComponent = () => {
  const { signIn, signUp, useSession } = authClient;

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await signIn.email({ email, password });
      // Handle successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Component JSX
  );
};
```

### Session Management

```typescript
import { useSession } from '@/lib/auth-client';

const ProtectedComponent = () => {
  const session = useSession();

  if (!session) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {session.user.name}!</div>;
};
```

## Styling Guidelines

### Tailwind CSS

The project uses Tailwind CSS for styling. Follow these conventions:

#### Class Organization

```typescript
// Group classes logically
<div className="
  flex items-center justify-center
  w-full max-w-md
  bg-white border border-gray-200 rounded-lg
  p-6 shadow-lg
">
```

#### Responsive Design

```typescript
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

#### CSS Variables

Use CSS variables defined in [`src/index.css`](src/index.css):

```css
.custom-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

### Component Styling

- Use `cn()` utility from [`@/lib/utils`](src/lib/utils.ts) for conditional classes
- Prefer Tailwind classes over custom CSS
- Use design system tokens for consistency

```typescript
import { cn } from '@/lib/utils';

const Button = ({ variant, className, ...props }) => {
  return (
    <button
      className={cn(
        'base-button-classes',
        {
          'primary-variant': variant === 'primary',
          'secondary-variant': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  );
};
```

## Type Definitions

### TypeScript Conventions

- Define interfaces for props, state, and API responses
- Use proper typing for event handlers
- Leverage TypeScript's strict mode

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

type EventHandler<T = HTMLButtonElement> = (
  event: React.MouseEvent<T>
) => void;
```

### Import Types

Use `type` imports for type-only imports:

```typescript
import type { User } from '@/types/user';
import type { ComponentProps } from 'react';
```

## Code Style Guidelines

### Import Organization

1. React and React-related imports
2. Third-party library imports
3. Internal utility imports
4. Component imports
5. Type imports

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { User } from '@/types/user';
```

### Error Handling

Use consistent error handling patterns:

```typescript
const fetchData = async () => {
  try {
    setIsLoading(true);
    const response = await api.getData();
    setData(response.data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    setError('Failed to load data. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

### Event Handlers

Use descriptive names and proper typing:

```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission
};

const handleUserClick = (userId: string) => {
  // Handle user click
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Handle input change
};
```

### Environment Variables

- Access via `import.meta.env` (Vite convention)
- Prefix with `VITE_` for client-side access
- Define types for environment variables

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

## Testing Guidelines

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserHome from '@/pages/user/UserHome';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('UserHome', () => {
  it('renders user home page', () => {
    renderWithRouter(<UserHome />);
    expect(screen.getByText('UserHome')).toBeInTheDocument();
  });
});
```

## Pull Request Guidelines

1. **Create feature branches** from `main`
2. **Follow naming conventions** outlined in this guide
3. **Test your changes** thoroughly
4. **Ensure TypeScript compilation** passes
5. **Update documentation** if needed
6. **Run linting** before submitting

### Commit Message Format

```
type(scope): description

Examples:
feat(auth): add login functionality
fix(ui): resolve button styling issue
docs: update component documentation
refactor(layout): improve responsive design
style: format code with prettier
```

### Branch Naming

```
feature/user-authentication
fix/navbar-responsive-issue
refactor/component-structure
docs/update-contributing-guide
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## Questions?

If you have questions about these conventions or need clarification on any patterns, please:

1. Check existing code in the repository for examples
2. Review the [README.md](README.md) for project overview
3. Create an issue for discussion
4. Ask in team communication channels

Thank you for contributing to DevSphere Frontend!