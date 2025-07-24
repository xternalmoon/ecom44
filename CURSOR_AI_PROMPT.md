# Complete E-Commerce Baby Clothing Store - Cursor AI Prompt

## Project Overview
Build a complete full-stack e-commerce web application specifically designed for baby and children's clothing retail. The application should provide distinct experiences for customers and administrators, featuring a modern React frontend with Express backend, PostgreSQL database with Drizzle ORM, and traditional email/password authentication.

## Core Requirements

### Application Type
- Full-stack e-commerce web application
- Multi-page application with client-side routing
- Real-time inventory management
- Role-based access control (customer/admin)
- Responsive design for mobile and desktop

### Technology Stack

#### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: TailwindCSS with custom baby-themed color scheme
- **State Management**: TanStack React Query v5 for server state, React hooks for local state
- **Build Tool**: Vite with hot module replacement
- **Form Handling**: React Hook Form with Zod validation

#### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **Authentication**: Traditional email/password with bcrypt hashing
- **API Design**: RESTful API with organized route structure

#### Dependencies to Install
```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@neondatabase/serverless": "^0.10.4",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@tanstack/react-query": "^5.60.5",
    "bcryptjs": "^3.0.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^3.6.0",
    "drizzle-orm": "^0.39.1",
    "drizzle-zod": "^0.7.0",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "framer-motion": "^11.13.1",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "next-themes": "^0.4.6",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "ws": "^8.18.0",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/connect-pg-simple": "^7.0.3",
    "@types/express": "4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/node": "20.16.11",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/ws": "^8.5.13",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "drizzle-kit": "^0.30.4",
    "esbuild": "^0.25.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.1",
    "typescript": "5.6.3",
    "vite": "^5.4.19"
  }
}
```

## Project Structure
```
/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── lib/
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       ├── components/
│       │   ├── ui/ (shadcn components)
│       │   ├── common/
│       │   │   ├── Navbar.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── ThemeProvider.tsx
│       │   └── auth/
│       │       ├── LoginForm.tsx
│       │       └── SignupForm.tsx
│       ├── pages/
│       │   ├── LandingPage.tsx
│       │   ├── HomePage.tsx
│       │   ├── ShopPage.tsx
│       │   ├── ProductDetailPage.tsx
│       │   ├── CartPage.tsx
│       │   ├── CheckoutPage.tsx
│       │   ├── ProfilePage.tsx
│       │   ├── LoginPage.tsx
│       │   ├── SignupPage.tsx
│       │   └── admin/
│       │       └── AdminDashboard.tsx
│       └── hooks/
│           └── use-toast.ts
├── server/
│   ├── index.ts
│   ├── db.ts
│   ├── auth.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── drizzle.config.ts
└── components.json
```

## Database Schema (shared/schema.ts)

Create comprehensive PostgreSQL schema using Drizzle ORM:

### Tables Required:
1. **sessions** - Express session storage
2. **users** - User authentication and profiles
3. **categories** - Product categorization
4. **products** - Product catalog
5. **carts** - Shopping carts
6. **cart_items** - Cart line items
7. **orders** - Order records
8. **order_items** - Order line items
9. **wishlists** - Customer wishlists
10. **reviews** - Product reviews

### Key Schema Features:
- Use `serial` for primary keys
- Use `decimal` for monetary values (precision: 10, scale: 2)
- Use `text().array()` for array fields (sizes, colors, image URLs)
- Include proper foreign key relationships
- Add timestamps with `defaultNow()`
- Include proper indexes for performance

### Sample Categories to Include:
- Baby Clothing (0-24 months)
- Kid Clothing (2-12 years)
- Teen Clothing (13-18 years)
- Accessories (hats, bibs, etc.)
- Footwear (shoes, booties)

### Age Groups:
- 0-6M, 6-12M, 12-18M, 18-24M
- 2T, 3T, 4T
- Size 4, Size 5, Size 6, Size 7, Size 8
- Size 10, Size 12, Size 14, Size 16

## Authentication System

### Backend Authentication (server/auth.ts):
- Use bcrypt for password hashing
- Session-based authentication with PostgreSQL storage
- Role-based access control (customer/admin)
- Secure session configuration with HTTP-only cookies

### Frontend Authentication:
- Login and signup forms with Zod validation
- Protected routes for authenticated users
- Admin-only routes for admin dashboard
- User profile management

## Frontend Pages Specification

### 1. Landing Page (Unauthenticated)
- Hero section with baby clothing imagery
- Call-to-action to sign up/login
- Featured product preview
- Brand information

### 2. Home Page (Authenticated)
- Navigation bar with logo, search, cart, profile
- Featured products carousel
- Category navigation grid
- Recent products section
- Footer with links

### 3. Shop Page
- Product grid with pagination
- Advanced filtering system:
  - Category filter
  - Age group filter
  - Size filter
  - Color filter
  - Price range slider
  - Brand filter
- Search functionality
- Sort options (price, name, rating, newest)

### 4. Product Detail Page
- Product image gallery with zoom
- Product information (name, price, description)
- Size and color selection
- Quantity selector
- Add to cart button
- Add to wishlist button
- Product reviews section
- Related products

### 5. Cart Page
- Cart items list with thumbnails
- Quantity update controls
- Remove item functionality
- Cart totals calculation
- Proceed to checkout button
- Continue shopping link

### 6. Checkout Page
- Multi-step checkout process:
  - Shipping information form
  - Payment information form
  - Order review
  - Order confirmation
- Address validation
- Order summary sidebar

### 7. Profile Page
- User information display/edit
- Order history
- Wishlist management
- Request admin access button
- Account settings

### 8. Admin Dashboard
- Product management (CRUD operations)
- Order management
- User management
- Category management
- Sales analytics
- Inventory management

## UI/UX Design Requirements

### Color Scheme (Baby-themed):
```css
:root {
  --baby-primary: hsl(220, 70%, 95%); /* Soft blue */
  --baby-secondary: hsl(350, 80%, 95%); /* Soft pink */
  --baby-accent: hsl(60, 80%, 95%); /* Soft yellow */
  --baby-green: hsl(120, 60%, 90%); /* Soft mint */
  --baby-neutral: hsl(0, 0%, 98%); /* Off white */
}
```

### Design Principles:
- Clean, modern design with rounded corners
- Soft, baby-friendly color palette
- Mobile-first responsive design
- Accessibility compliance (ARIA labels, keyboard navigation)
- Smooth animations and transitions
- Clear call-to-action buttons

### Component Requirements:
- Consistent spacing using Tailwind classes
- Hover states for interactive elements
- Loading states for async operations
- Error states with clear messaging
- Empty states for no data scenarios

## API Routes (server/routes.ts)

### Authentication Routes:
- POST /api/auth/signup - User registration
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- GET /api/auth/user - Get current user

### Product Routes:
- GET /api/products - List products with filters
- GET /api/products/:id - Get single product
- POST /api/admin/products - Create product (admin only)
- PUT /api/admin/products/:id - Update product (admin only)
- DELETE /api/admin/products/:id - Delete product (admin only)

### Category Routes:
- GET /api/categories - List all categories
- POST /api/admin/categories - Create category (admin only)

### Cart Routes:
- GET /api/cart - Get user's cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item
- DELETE /api/cart/:id - Remove cart item

### Order Routes:
- GET /api/orders - Get user's orders
- POST /api/orders - Create new order
- GET /api/admin/orders - Get all orders (admin only)

### User Routes:
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- POST /api/users/request-admin - Request admin access

## Security Requirements

### Backend Security:
- Password hashing with bcrypt (salt rounds: 12)
- Session security with secure flags
- Input validation using Zod schemas
- SQL injection prevention through Drizzle ORM
- Rate limiting on authentication endpoints
- CORS configuration for frontend domain

### Frontend Security:
- XSS prevention through React's built-in protections
- Secure storage of session tokens
- Input sanitization in forms
- Client-side validation (with server-side backup)

## Development Configuration

### Package.json Scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  }
}
```

### Environment Variables Required:
- DATABASE_URL - PostgreSQL connection string
- SESSION_SECRET - Secret for session encryption
- NODE_ENV - Environment (development/production)

### Vite Configuration:
- React plugin for JSX support
- TypeScript support
- Path aliases for clean imports (@/, @shared/, etc.)
- Proxy configuration for API routes in development

## Business Logic Requirements

### Inventory Management:
- Automatic stock reduction on order placement
- Stock validation before allowing purchases
- Low stock warnings in admin dashboard
- Out of stock handling in product display

### Pricing System:
- Support for original price and sale price
- Currency formatting (consider localization)
- Tax calculation capabilities
- Shipping cost calculation

### Order Processing:
- Order status tracking (pending, processing, shipped, delivered)
- Email notifications for order updates
- Order history with detailed information
- Return/refund request system

## Performance Requirements

### Frontend Performance:
- Lazy loading for product images
- Pagination for product listings
- Debounced search functionality
- Optimistic updates for cart operations
- Skeleton loading states

### Backend Performance:
- Database connection pooling
- Efficient queries with proper indexes
- Caching for frequently accessed data
- Image optimization and CDN integration

## Testing Considerations

### Frontend Testing:
- Component unit tests
- Integration tests for user flows
- Accessibility testing
- Responsive design testing

### Backend Testing:
- API endpoint tests
- Database operation tests
- Authentication flow tests
- Error handling tests

## Deployment Requirements

### Production Setup:
- Environment variable configuration
- Database migration strategy
- Static asset serving
- HTTPS configuration
- Error logging and monitoring

### Build Process:
- Frontend build with Vite
- Backend compilation with esbuild
- Database schema deployment with Drizzle
- Asset optimization

## Sample Data Requirements

### Initial Categories:
1. Baby Clothing - Comfortable clothing for babies 0-24 months
2. Kid Clothing - Trendy clothing for children 2-12 years
3. Teen Clothing - Stylish clothing for teenagers 13-18 years
4. Accessories - Hats, bibs, blankets, and other accessories
5. Footwear - Shoes, booties, and socks

### Sample Products (Create 10-15):
- Include variety of age groups, sizes, colors
- Mix of featured and regular products
- Different price points
- Realistic product descriptions
- Placeholder image URLs

### Admin User:
- Email: admin@babystore.com
- Password: admin123 (hashed with bcrypt)
- Role: admin

## Additional Features to Implement

### Essential Features:
- Product search with autocomplete
- Wishlist functionality
- Product reviews and ratings
- Cart persistence across sessions
- Order tracking
- User profile management

### Advanced Features (Optional):
- Product recommendations
- Email notifications
- Social media sharing
- Multiple payment methods
- Inventory alerts
- Sales reporting and analytics

## Development Best Practices

### Code Organization:
- Consistent file naming conventions
- Proper TypeScript types throughout
- Reusable component patterns
- Clean separation of concerns
- Proper error handling

### Database Best Practices:
- Proper normalization
- Efficient indexing
- Transaction management for critical operations
- Data validation at multiple levels
- Backup and recovery planning

This comprehensive prompt provides every detail needed to recreate the exact e-commerce baby clothing store web application with all its features, security measures, and architectural decisions.