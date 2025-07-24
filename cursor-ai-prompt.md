# Complete E-Commerce Baby Clothing Store - Comprehensive Cursor AI Prompt

Build a production-ready full-stack e-commerce web application for baby clothing with complete functionality, modern architecture, and professional UI/UX.

## Tech Stack & Architecture

### Frontend Stack
- **React 18** with TypeScript and ES modules
- **Vite** as build tool with hot module replacement
- **Wouter** for lightweight client-side routing
- **TailwindCSS** + **Shadcn/ui** components (built on Radix UI primitives)
- **TanStack React Query v5** for server state management
- **React Hook Form** with **Zod** validation
- **Framer Motion** for smooth animations
- **Lucide React** for icons

### Backend Stack
- **Node.js** with **Express.js** and TypeScript
- **Drizzle ORM** with PostgreSQL for type-safe database operations
- **bcrypt** for password hashing
- **express-session** with PostgreSQL storage (connect-pg-simple)
- **Zod** schemas shared between frontend and backend
- **tsx** for TypeScript development execution

### Database & Authentication
- **PostgreSQL** with connection pooling
- Email/password authentication with secure session management
- Role-based access control (customer/admin)
- Session storage in PostgreSQL for scalability

## Complete Database Schema

Create these tables with Drizzle ORM:

```typescript
// Users table
users: {
  id: serial (primary key)
  email: varchar(255) unique not null
  password: varchar(255) not null (bcrypt hashed)
  firstName: varchar(100)
  lastName: varchar(100)
  profileImageUrl: varchar(500)
  role: varchar default 'customer' ('customer' | 'admin')
  createdAt: timestamp
  updatedAt: timestamp
}

// Categories table
categories: {
  id: serial (primary key)
  name: varchar(100) not null
  slug: varchar(100) unique not null
  description: text
  createdAt: timestamp
}

// Products table
products: {
  id: serial (primary key)
  name: varchar(200) not null
  description: text
  price: decimal(10,2) not null
  originalPrice: decimal(10,2)
  sku: varchar(100) unique
  categoryId: integer (foreign key to categories)
  ageGroup: varchar(50) not null
  sizes: text array not null
  colors: text array not null
  imageUrl: varchar(500)
  imageUrls: text array
  referenceImages: text array
  stock: integer default 0
  isActive: boolean default true
  isFeatured: boolean default false
  rating: decimal(3,2) default 0
  reviewCount: integer default 0
  createdAt: timestamp
  updatedAt: timestamp
}

// Carts, cart_items, orders, order_items, wishlists, reviews, sessions tables
```

## Frontend Architecture & Pages

### Page Structure
1. **Landing Page** (`/`) - Unauthenticated welcome with sign-in prompt
2. **Home Page** (`/home`) - Dashboard with featured products and categories
3. **Shop Page** (`/shop`) - Product catalog with advanced filtering
4. **Product Detail** (`/product/:id`) - Individual product with reviews and purchase options
5. **Cart Page** (`/cart`) - Shopping cart management
6. **Checkout Page** (`/checkout`) - Multi-step checkout process
7. **Profile Page** (`/profile`) - User account and order history
8. **Admin Dashboard** (`/admin`) - Administrative interface
9. **Login/Signup Pages** - Authentication forms

### Component Architecture
- Shared components in `/client/src/components/ui/` (Shadcn/ui)
- Page-specific components in respective page directories
- Custom hooks for data fetching and form handling
- Reusable layout components (Navbar, Footer, Sidebar)

### UI/UX Specifications
- **Color Scheme**: Baby-themed pastels with custom CSS variables:
  - Primary: Soft pink/coral tones
  - Secondary: Light blue/mint green
  - Accent: Warm yellow/peach
  - Neutral: Clean grays and whites
- **Typography**: Modern, readable fonts optimized for e-commerce
- **Mobile-First**: Responsive design with breakpoint-aware layouts
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Toast notifications and error boundaries

## Core Functionality Implementation

### Authentication System
- Email/password registration with validation
- Secure login with bcrypt password verification
- Session-based authentication (no JWT)
- Role-based route protection
- Admin access request system from user profile

### Product Management
- **Customer Features**:
  - Browse products with category/age group filters
  - Search functionality
  - Price range filtering
  - Size and color selection
  - Product ratings and reviews
  - Add to cart/wishlist

- **Admin Features**:
  - Complete product CRUD operations
  - Bulk product management
  - Image upload handling
  - Inventory management
  - Category management

### Shopping Cart & Checkout
- Persistent cart storage per user
- Real-time stock validation
- Quantity updates with stock checking
- Multi-step checkout:
  1. Cart review
  2. Shipping information
  3. Billing information
  4. Order confirmation
- Automatic inventory reduction on successful orders

### Order Management
- Order history for customers
- Order processing workflow for admins
- Order status updates
- Detailed order items tracking

## Backend API Design

### Authentication Routes
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/user - Get current user
```

### Product Routes
```
GET /api/products - List products (with filtering)
GET /api/products/featured - Featured products
GET /api/products/:id - Get single product
POST /api/admin/products - Create product (admin only)
PUT /api/admin/products/:id - Update product (admin only)
DELETE /api/admin/products/:id - Delete product (admin only)
```

### Cart & Order Routes
```
GET /api/cart - Get user's cart
POST /api/cart/add - Add item to cart
PUT /api/cart/update - Update cart item
DELETE /api/cart/remove - Remove from cart
POST /api/orders - Create order
GET /api/orders - Get user's orders
```

## Technical Requirements

### Data Validation
- Shared Zod schemas between frontend and backend
- Form validation with React Hook Form
- Server-side request validation
- Database constraints and relationships

### Security Measures
- Password hashing with bcrypt (12 rounds)
- SQL injection protection via Drizzle ORM
- Session security with HTTP-only cookies
- CORS configuration
- Input sanitization

### Performance Optimization
- Database connection pooling
- React Query caching strategies
- Image optimization and lazy loading
- Code splitting with React.lazy
- Bundle optimization with Vite

### Error Handling
- Global error boundaries in React
- Structured error responses from API
- User-friendly error messages
- Logging for debugging

## Sample Data & Testing

### Categories to Seed
- Baby Clothing (0-24 months)
- Kid Clothing (2-12 years)
- Teen Clothing (13-18 years)
- Accessories (hats, bibs, blankets)
- Footwear (shoes, booties, socks)

### Age Groups
- 0-6M (0-6 months)
- 5Year-10Year
- 10Year-15Year

### Sample Products
Create sample products for each category with:
- Multiple sizes: NB, 3M, 6M, 9M, 12M, 18M, 2T, 3T, 4T, etc.
- Color options: Pink, Blue, White, Yellow, Green, etc.
- Stock quantities and pricing
- Product descriptions and features
- Sample images (use placeholder services)

## Development Setup

### Project Structure
```
/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── App.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── db.ts
│   └── auth.ts
├── shared/
│   └── schema.ts
├── package.json
├── drizzle.config.ts
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --bundle --platform=node --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

### Environment Variables
- DATABASE_URL (PostgreSQL connection string)
- SESSION_SECRET (for express-session)
- NODE_ENV (development/production)

## Implementation Priority
1. Set up project structure and database schema
2. Implement authentication system
3. Build product catalog and display
4. Create shopping cart functionality
5. Implement checkout process
6. Build admin dashboard
7. Add advanced features (reviews, wishlist)
8. Optimize performance and add error handling
9. Style with responsive design
10. Add sample data and test thoroughly

Create a complete, professional e-commerce application that demonstrates modern web development practices with proper separation of concerns, type safety, and excellent user experience.