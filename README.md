# Bookkeeping Business App

A modern Angular application for managing business transactions with an intuitive cart-based interface. Built with Angular 19, standalone components, and NgRx Signals for state management.

## Project Overview

This application provides a clean, professional transaction management interface where users can:
- View a comprehensive list of business transactions
- Add transactions to a cart for processing
- Remove transactions from the cart
- View cart totals and transaction count with real-time updates
- Navigate seamlessly between transaction overview and cart views
- Experience responsive design optimized for both desktop and mobile devices

## Key Features

- **Modern Architecture**: Built with Angular 19 standalone components
- **State Management**: NgRx Signals for reactive state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG-compliant design with proper contrast ratios and focus management
- **Performance**: Lazy loading, code splitting, and optimized bundle sizes
- **Testing**: 100% test coverage with 83 comprehensive unit tests
- **Clean Code**: Feature-based architecture with shared components and utilities

## Project Structure

```
bookeeping-business-app/
├── src/
│   ├── app/
│   │   ├── core/                            # Core application modules
│   │   │   ├── constants/                   # Application-wide constants
│   │   │   │   ├── app.constants.ts         # UI text and labels
│   │   │   │   ├── data.constants.ts        # Mock data and storage keys
│   │   │   │   ├── format.constants.ts      # Formatting constants
│   │   │   │   └── index.ts                 # Constants barrel export
│   │   │   ├── models/                      # Domain models
│   │   │   │   ├── transaction.model.ts     # Transaction interface
│   │   │   │   └── index.ts                 # Models barrel export
│   │   │   ├── utils/                       # Utility functions
│   │   │   │   ├── number.utils.ts          # Number formatting utilities
│   │   │   │   ├── number.utils.spec.ts     # Number utils tests
│   │   │   │   ├── string.utils.ts          # String formatting utilities
│   │   │   │   ├── string.utils.spec.ts     # String utils tests
│   │   │   │   └── index.ts                 # Utils barrel export
│   │   │   └── index.ts                     # Core barrel export
│   │   ├── features/                        # Feature modules
│   │   │   ├── cart/                        # Cart feature
│   │   │   │   ├── cart.component.html      # Cart page template
│   │   │   │   ├── cart.component.scss      # Cart-specific styles
│   │   │   │   ├── cart.component.spec.ts   # Cart component tests
│   │   │   │   ├── cart.component.ts        # Cart component logic
│   │   │   │   └── index.ts                 # Cart barrel export
│   │   │   ├── transaction-list/            # Transaction list feature
│   │   │   │   ├── transaction-list.component.html # Main view template
│   │   │   │   ├── transaction-list.component.scss # Feature-specific styles
│   │   │   │   ├── transaction-list.component.spec.ts # Component tests
│   │   │   │   ├── transaction-list.component.ts # Component logic
│   │   │   │   └── index.ts                 # Transaction list barrel export
│   │   │   └── index.ts                     # Features barrel export
│   │   ├── shared/                          # Shared/reusable components
│   │   │   ├── components/                  # Shared UI components
│   │   │   │   ├── transaction-card/        # Mobile transaction card
│   │   │   │   │   ├── transaction-card.component.html
│   │   │   │   │   ├── transaction-card.component.spec.ts
│   │   │   │   │   └── transaction-card.component.ts
│   │   │   │   ├── transaction-row/         # Desktop transaction row
│   │   │   │   │   ├── transaction-row.component.html
│   │   │   │   │   ├── transaction-row.component.spec.ts
│   │   │   │   │   └── transaction-row.component.ts
│   │   │   │   └── index.ts                 # Components barrel export
│   │   │   ├── types/                       # Shared type definitions
│   │   │   │   ├── transaction.types.ts     # Transaction-related types
│   │   │   │   └── index.ts                 # Types barrel export
│   │   │   └── index.ts                     # Shared barrel export
│   │   ├── store/                           # State management
│   │   │   ├── transaction.store.ts         # NgRx Signals store
│   │   │   └── transaction.store.spec.ts    # Store unit tests
│   │   ├── app.component.html               # Root component template
│   │   ├── app.component.scss               # Root component styles
│   │   ├── app.component.spec.ts            # Root component tests
│   │   ├── app.component.ts                 # Root component logic
│   │   └── app.routes.ts                    # Application routing configuration
│   ├── index.html                           # Main HTML file with inline critical CSS
│   ├── main.ts                              # Application bootstrap with providers
│   └── styles.scss                          # Global SCSS styles and design system
├── coverage/                                # Test coverage reports (100% coverage)
├── wireframe1.png                           # Design wireframes for reference
├── wireframe2.png                           # Additional wireframe mockups
├── Technical Assessment - Rabobank.pdf     # Project requirements document
├── angular.json                             # Angular CLI configuration
├── package.json                             # NPM dependencies and scripts
├── package-lock.json                        # NPM lockfile
├── tsconfig.json                            # TypeScript configuration
├── tsconfig.app.json                        # Application TypeScript config
├── tsconfig.spec.json                       # Test TypeScript configuration
├── karma.conf.js                            # Karma test runner configuration
├── eslint.config.js                         # ESLint code quality configuration
├── tailwind.config.js                       # Tailwind CSS configuration
├── postcss.config.js                        # PostCSS configuration
└── README.md                                # Project documentation
```

## Technology Stack

- **Angular 19** - Latest Angular framework with standalone components
- **TypeScript** - Strongly typed JavaScript superset
- **NgRx Signals** - Modern reactive state management
- **SCSS** - Enhanced CSS with variables, mixins, and design tokens
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Jasmine/Karma** - Testing framework with comprehensive unit tests
- **ESLint** - Code linting and quality assurance
- **PostCSS** - Advanced CSS processing and optimization

## Architecture Highlights

### 🏗️ **Clean Architecture**
- **Feature-based structure** - Organized by business domains
- **Core/Shared pattern** - Reusable components and utilities
- **Barrel exports** - Clean import paths and better tree-shaking
- **Separation of concerns** - Clear boundaries between UI, logic, and data

### 🛒 **Transaction Management**
- Add/remove transactions from cart with real-time updates
- Persistent cart state using localStorage
- Optimistic UI updates with proper error handling
- Duplicate transaction prevention with user feedback

### 🎯 **Modern Angular Patterns**
- **Standalone components** - No NgModules, cleaner dependency injection
- **NgRx Signals** - Reactive state management with fine-grained reactivity
- **Lazy loading** - Feature modules loaded on-demand for better performance
- **Comprehensive testing** - 83 unit tests with 100% code coverage

### 🎨 **Responsive Design**
- **Mobile-first approach** - Optimized for all device sizes
- **Adaptive layouts** - Card view on mobile, table view on desktop
- **Accessibility compliant** - WCAG guidelines with proper contrast ratios
- **Touch-friendly** - 44px minimum touch targets for mobile usability

### ⚡ **Performance Optimizations**
- **Code splitting** - Lazy-loaded feature modules
- **Bundle optimization** - Tree-shaking and dead code elimination
- **Critical CSS inlining** - Faster initial page load
- **Preloading strategies** - Intelligent resource preloading

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (optional, but recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bookeeping-business-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run unit tests with coverage report
- `npm run test:watch` - Run tests in watch mode for development
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint code quality checks

## Application Routes

- `/` - **Transaction List** - Main view showing all available transactions
- `/cart` - **Cart Management** - View and manage selected transactions

## Testing

The application maintains **100% test coverage** with comprehensive unit tests:

```bash
npm test                    # Run all tests once with coverage report
npm run test:watch         # Run tests in watch mode for development
```

**Test Coverage Summary:**
- **83 total tests** across all components, services, and utilities
- **100% Statements** (115/115)
- **100% Branches** (37/37)  
- **100% Functions** (38/38)
- **100% Lines** (110/110)

### Test Categories:
- **Component Tests**: UI behavior, user interactions, routing
- **Store Tests**: State management, cart operations, data persistence
- **Utility Tests**: Formatting functions, helper methods
- **Integration Tests**: Component interactions with store

## State Management

The application uses **NgRx Signals** with the `TransactionStore` for reactive state management:

```typescript
TransactionStore {
  // State
  transactions: Signal<Transaction[]>     // All available transactions
  cartIds: Signal<number[]>              // IDs of items in cart
  loading: Signal<boolean>               // Loading state indicator
  
  // Computed Signals
  cartTransactions: Signal<Transaction[]> // Cart items with full data
  cartCount: Signal<number>              // Number of items in cart
  cartTotal: Signal<number>              // Total amount in cart
  
  // Actions
  addToCart(id: number): void           // Add transaction to cart
  removeFromCart(id: number): void      // Remove transaction from cart
  clearCart(): void                     // Clear entire cart
}
```

## Data Model

```typescript
interface Transaction {
  id: number;           // Unique identifier
  contractorName: string; // Business/contractor name
  accountNumber: string;  // Dutch bank account format (e.g., "RBO1234567")
  amountPaid: number;    // Amount in EUR (stored as number)
}
```

## Code Quality & Standards

### Architecture Patterns
- **Feature-based organization** - Code organized by business functionality
- **Single Responsibility Principle** - Each class/function has one clear purpose
- **Dependency Injection** - Proper Angular DI patterns with providers
- **Reactive Programming** - Signal-based reactivity throughout the application

### Code Standards
- **TypeScript strict mode** - Enhanced type safety
- **ESLint configuration** - Automated code quality and style checking
- **Angular style guide** - Following official Angular conventions
- **SCSS organization** - Structured styles with design tokens and mixins

## Performance Optimizations

- **Lazy Loading** - Feature modules loaded on demand
- **Tree Shaking** - Unused code eliminated from bundles
- **OnPush Change Detection** - Optimized component update cycles
- **Critical CSS Inlining** - Faster initial page rendering
- **Bundle Splitting** - Separate chunks for vendor and application code

## Accessibility Features

- **WCAG 2.1 AA Compliance** - Proper contrast ratios and color usage
- **Keyboard Navigation** - Full keyboard accessibility support
- **Screen Reader Support** - Semantic HTML and proper ARIA labels
- **Touch-Friendly Design** - 44px minimum touch targets
- **High Contrast Mode** - Support for system high contrast preferences

## Browser Compatibility

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support** - iOS Safari, Android Chrome
- **Progressive Enhancement** - Core functionality works without JavaScript

## License

This project is built for assessment purposes and demonstrates modern Angular development practices.

---

**Built with ❤️ using Angular 19, NgRx Signals, and Tailwind CSS**
- Follows Angular style guide and best practices
- Clean architecture with separation of concerns
- All empty and unused files have been removed for optimal project structure