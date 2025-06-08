# Frontend Architecture

This document outlines the architecture and design patterns used in the Robo Events Platform frontend.

## Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Modules
- **State Management**: React Context + useReducer
- **Data Fetching**: SWR for client-side data fetching
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI Primitives + Shadcn/ui
- **Testing**: Jest + React Testing Library + Cypress
- **Linting/Formatting**: ESLint + Prettier

## Project Structure

```
frontend/
├── app/                    # App Router pages
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Authenticated routes
│   │   ├── events/
│   │   ├── teams/
│   │   └── profile/
│   ├── api/                # API routes
│   ├── _components/        # Shared components
│   ├── _hooks/             # Custom React hooks
│   ├── _lib/               # Utility functions
│   ├── _providers/         # Context providers
│   └── _types/             # TypeScript types
├── public/                 # Static assets
├── styles/                 # Global styles
└── cypress/                # E2E tests
```

## Key Architectural Decisions

### 1. App Router
- Uses Next.js 13+ App Router for file-system based routing
- Implements route groups for logical grouping
- Uses loading.js for loading states
- Implements error.js for error boundaries

### 2. Data Fetching

#### Server Components
- Used for data fetching that can happen on the server
- Example:
  ```tsx
  async function EventsList() {
    const events = await fetchEvents();
    return <EventsListClient events={events} />;
  }
  ```

#### Client Components
- Uses SWR for client-side data fetching with revalidation
- Example:
  ```tsx
  function EventDetails({ eventId }: { eventId: string }) {
    const { data: event, error } = useSWR(`/api/events/${eventId}`, fetcher);
    
    if (error) return <ErrorComponent error={error} />;
    if (!event) return <LoadingSpinner />;
    
    return <EventCard event={event} />;
  }
  ```

### 3. State Management

#### Local State
- `useState` for component-level state
- `useReducer` for complex state logic

#### Global State
- React Context for global state that doesn't change often
- Example:
  ```tsx
  // _providers/auth-provider.tsx
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    const value = {
      user,
      login: async (email: string, password: string) => {
        // Login logic
      },
      logout: async () => {
        // Logout logic
      },
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }
  ```

### 4. Styling Approach

#### Tailwind CSS
- Utility-first CSS framework
- Custom theme configuration in `tailwind.config.js`
- Responsive design with breakpoint prefixes

#### CSS Modules
- Used for component-specific styles
- Scoped CSS to prevent naming conflicts
- Example:
  ```tsx
  // Button.module.css
  .primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  // Button.tsx
  import styles from './Button.module.css';
  
  export function Button({ children, variant = 'primary' }) {
    return (
      <button className={`${styles.button} ${styles[variant]}`}>
        {children}
      </button>
    );
  }
  ```

### 5. Form Handling

#### React Hook Form + Zod
- Type-safe form validation
- Minimal re-renders
- Example:
  ```tsx
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  
  const eventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description is too short'),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  });
  
  type EventFormData = z.infer<typeof eventSchema>;
  
  function EventForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<EventFormData>({
      resolver: zodResolver(eventSchema),
    });
    
    const onSubmit = (data: EventFormData) => {
      console.log(data);
    };
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} />
        {errors.title && <span>{errors.title.message}</span>}
        
        <button type="submit">Create Event</button>
      </form>
    );
  }
  ```

## Performance Optimization

### 1. Code Splitting
- Automatic with Next.js App Router
- Dynamic imports for heavy components:
  ```tsx
  const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
    ssr: false,
    loading: () => <SkeletonLoader />,
  });
  ```

### 2. Image Optimization
- Next.js Image component
- Automatic format, quality, and resizing
- Lazy loading by default

### 3. Bundle Analysis
- `@next/bundle-analyzer` for bundle size analysis
- Run with `ANALYZE=true npm run build`

## Testing Strategy

### 1. Unit Tests
- Test individual components in isolation
- Mock external dependencies
- Test component rendering and interactions

### 2. Integration Tests
- Test component interactions
- Mock API responses with MSW (Mock Service Worker)

### 3. E2E Tests
- Test critical user flows
- Use Cypress for browser automation
- Run against a test database

## Environment Variables

```
NEXT_PUBLIC_API_URL=     # API base URL
NEXT_PUBLIC_ENV=         # Environment (development, production, etc.)
NEXT_PUBLIC_GA_ID=       # Google Analytics ID
```

## Error Handling

### 1. Client-Side Errors
- Error boundaries for React component errors
- Global error handler for uncaught exceptions

### 2. API Errors
- Centralized error handling with axios interceptors
- Consistent error responses from the API

### 3. User Feedback
- Toast notifications for success/error messages
- Loading states during async operations

## Internationalization (i18n)

- Next.js built-in i18n routing
- JSON files for translations
- Example:
  ```json
  // en/common.json
  {
    "welcome": "Welcome to Robo Events",
    "login": "Log In",
    "register": "Register"
  }
  ```

## Accessibility (a11y)

- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation
- Screen reader testing
- Color contrast checking

## Security

### 1. Authentication
- JWT tokens stored in HTTP-only cookies
- CSRF protection
- Secure API endpoints

### 2. Data Validation
- Input validation on both client and server
- Output encoding to prevent XSS

### 3. Dependencies
- Regular security audits with `npm audit`
- Dependabot for dependency updates

## Development Workflow

1. Create a feature branch: `git checkout -b feature/name`
2. Implement changes
3. Write tests
4. Run linter: `npm run lint`
5. Run tests: `npm test`
6. Create pull request
7. Code review
8. Merge to main

## Deployment

### Vercel (Recommended)
- Automatic deployments from main branch
- Preview deployments for pull requests
- Environment variables management

### Self-Hosted
- Docker container with Nginx
- Environment variables in `.env.local`
- PM2 for process management

## Monitoring and Analytics

### 1. Error Tracking
- Sentry for error tracking
- LogRocket for session replay

### 2. Performance Monitoring
- Web Vitals
- Custom metrics

### 3. Analytics
- Google Analytics
- Custom event tracking

## Future Improvements

1. Implement Server-Side Rendering (SSR) for better SEO
2. Add GraphQL API support
3. Implement WebSockets for real-time updates
4. Add progressive web app (PWA) support
5. Implement offline-first functionality with service workers
