# Testing Guide

## Overview

This project uses Jest and React Testing Library for unit and integration testing. Tests ensure the reliability of critical features including authentication, checkout, product management, and admin functionality.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
__tests__/
├── api/              # API route tests
│   ├── auth/         # Authentication endpoints
│   ├── products/     # Product endpoints
│   └── checkout/     # Checkout and payment
├── components/       # Component tests
├── lib/              # Utility function tests
└── integration/      # End-to-end integration tests
```

## Writing Tests

### API Route Tests

Test API routes by mocking Prisma and NextAuth:

```typescript
import { POST } from '@/app/api/auth/signup/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('POST /api/auth/signup', () => {
  it('creates a new user', async () => {
    // Test implementation
  });
});
```

### Component Tests

Test React components with React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/common/ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    // Test implementation
  });
});
```

## Test Coverage Goals

- **API Routes**: 80%+ coverage
- **Components**: 70%+ coverage
- **Utilities**: 90%+ coverage
- **Critical Paths**: 100% coverage (auth, checkout, payments)

## Critical Test Cases

### Authentication
- [ ] User signup with valid data
- [ ] User signup with duplicate email
- [ ] Email verification flow
- [ ] Password reset flow
- [ ] Sign in with valid credentials
- [ ] Sign in with invalid credentials
- [ ] OAuth provider authentication

### Products
- [ ] Fetch products with filters
- [ ] Fetch single product by ID
- [ ] Create product (admin)
- [ ] Update product (admin)
- [ ] Delete product (admin)
- [ ] Product search functionality

### Cart & Checkout
- [ ] Add item to cart
- [ ] Remove item from cart
- [ ] Update cart quantity
- [ ] Create checkout session
- [ ] Process Stripe webhook
- [ ] Order creation on successful payment

### Admin
- [ ] Admin authentication
- [ ] Dashboard statistics
- [ ] Category CRUD operations
- [ ] Order management
- [ ] Order status updates

### Security
- [ ] Rate limiting on auth endpoints
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection

## Mocking

### Prisma
```typescript
jest.mock('@/lib/prisma', () => ({
  prisma: {
    // Mock database operations
  },
}));
```

### NextAuth
```typescript
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));
```

### Stripe
```typescript
jest.mock('@/lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
  },
}));
```

## Integration Testing

Integration tests verify complete user flows:

1. **User Registration Flow**
   - Sign up → Email verification → Sign in

2. **Shopping Flow**
   - Browse products → Add to cart → Checkout → Payment

3. **Admin Flow**
   - Admin login → Create product → Update product → Delete product

## Manual Testing Checklist

Before deployment, manually test:

- [ ] User signup and email verification
- [ ] Password reset flow
- [ ] Product browsing and filtering
- [ ] Add to cart and checkout
- [ ] Stripe payment (test mode)
- [ ] Order confirmation email
- [ ] Admin dashboard access
- [ ] Product management (CRUD)
- [ ] Category management
- [ ] Order management
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## Performance Testing

- [ ] Page load times < 3s
- [ ] API response times < 500ms
- [ ] Image optimization
- [ ] Database query optimization
- [ ] Lighthouse score > 90

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment

## Debugging Tests

```bash
# Run specific test file
npm test -- path/to/test.ts

# Run tests matching pattern
npm test -- --testNamePattern="auth"

# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Test Behavior**: Focus on what users see/do
3. **Mock External Dependencies**: Database, APIs, third-party services
4. **Clean Up**: Reset mocks and state between tests
5. **Descriptive Names**: Test names should explain what they verify
6. **Edge Cases**: Test error conditions and boundary cases
7. **Avoid Implementation Details**: Test public interfaces

## Common Issues

### Tests Timing Out
- Increase timeout: `jest.setTimeout(10000)`
- Check for unresolved promises
- Verify mock implementations

### Database Connection Errors
- Ensure Prisma is properly mocked
- Don't connect to real database in tests

### Authentication Failures
- Mock `getServerSession` correctly
- Provide valid session data in tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
