# Testing Strategy

This document outlines the testing approach for the Robo Events Platform, including test types, tools, and best practices.

## Test Types

### 1. Unit Tests
**Purpose**: Test individual components in isolation
**Coverage**: Models, utility functions, helpers
**Location**: `backend/coreapp/tests/test_*.py`

### 2. Integration Tests
**Purpose**: Test interactions between components
**Coverage**: API endpoints, service interactions
**Location**: `backend/coreapp/tests/integration/test_*.py`

### 3. API Tests
**Purpose**: Test API contracts and responses
**Coverage**: All API endpoints
**Location**: `backend/coreapp/tests/api/test_*.py`

### 4. Frontend Tests
**Purpose**: Test React components and UI interactions
**Coverage**: Components, pages, hooks
**Location**: `frontend/__tests__/`

### 5. End-to-End (E2E) Tests
**Purpose**: Test complete user flows
**Coverage**: Critical user journeys
**Location**: `e2e/`

## Test Tools

### Backend
- **Framework**: pytest
- **Coverage**: pytest-cov
- **Mocks**: unittest.mock
- **Fixtures**: pytest fixtures
- **API Testing**: Django REST framework's APITestCase

### Frontend
- **Framework**: Jest
- **Testing Library**: React Testing Library
- **E2E**: Cypress
- **Mock Service Worker**: For API mocking

## Running Tests

### Backend Tests
```bash
# Run all tests
pytest

# Run tests with coverage
pytest --cov=.

# Run specific test file
pytest path/to/test_file.py

# Run specific test case
pytest path/to/test_file.py::TestClass::test_method
```

### Frontend Tests
```bash
# Unit tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# E2E tests (requires frontend server running)
npm run cypress:open
```

## Writing Tests

### Backend Test Example
```python
# tests/test_models.py
def test_event_model():
    event = Event.objects.create(
        title="Robotics Competition",
        description="Annual robotics competition",
        start_date=timezone.now(),
        end_date=timezone.now() + timezone.timedelta(days=2),
        location="Convention Center",
        max_participants=100
    )
    assert str(event) == "Robotics Competition"
    assert event.status == "upcoming"
```

### Frontend Test Example
```javascript
// __tests__/components/EventCard.test.jsx
import { render, screen } from '@testing-library/react';
import EventCard from '../../components/EventCard';

describe('EventCard', () => {
  const mockEvent = {
    id: 1,
    title: 'Robotics Workshop',
    date: '2023-06-15T10:00:00Z',
    location: 'Tech Hub',
  };

  it('displays event details', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Robotics Workshop')).toBeInTheDocument();
    expect(screen.getByText('Tech Hub')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
```

## Test Coverage

We aim to maintain:
- 80%+ code coverage for backend
- 70%+ code coverage for frontend
- 90%+ coverage for critical paths

To generate coverage reports:
```bash
# Backend
pytest --cov=.


# Frontend
npm test -- --coverage
```

## Testing Best Practices

1. **Write deterministic tests** - Tests should produce the same results every time
2. **Test behavior, not implementation** - Focus on what the code does, not how it does it
3. **Use descriptive test names** - Test names should describe the behavior being tested
4. **Keep tests independent** - Each test should set up its own state
5. **Use fixtures for common setup** - Reduce code duplication
6. **Test edge cases** - Include tests for error conditions and boundary values
7. **Mock external services** - Don't rely on external services in unit tests
8. **Run tests in CI** - Ensure all tests pass before merging code

## Continuous Integration

Tests are automatically run on every push and pull request using GitHub Actions. The CI pipeline includes:
1. Linting (ESLint, Flake8)
2. Type checking (TypeScript, mypy)
3. Unit tests
4. Integration tests
5. E2E tests (on schedule)

## Performance Testing

For performance-critical components, consider adding performance tests:

```python
# Example performance test using pytest-benchmark
def test_event_creation_performance(benchmark):
    def create_event():
        return Event.objects.create(
            title="Performance Test Event",
            description="Test",
            start_date=timezone.now(),
            end_date=timezone.now() + timezone.timedelta(hours=2)
        )
    
    # Run the benchmark
    result = benchmark(create_event)
    assert result is not None
```

## Security Testing

1. **Dependency Scanning**: Use `npm audit` and `safety check`
2. **SAST**: Static Application Security Testing
3. **DAST**: Dynamic Application Security Testing
4. **OWASP ZAP**: For security scanning

## Test Data Management

Use factories to create test data:

```python
# tests/factories.py
import factory
from coreapp.models import Event, User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    
    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.Sequence(lambda n: f'user{n}@example.com')

class EventFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Event
    
    title = "Test Event"
    description = "Test Description"
    start_date = timezone.now()
    end_date = timezone.now() + timezone.timedelta(days=1)
    created_by = factory.SubFactory(UserFactory)
```

## Flaky Tests

To handle flaky tests:
1. Identify the root cause
2. Fix the test to be more reliable
3. If necessary, mark with `@pytest.mark.flaky` with a reason
4. Document known issues in the test file

## Test Maintenance

1. Review and update tests when making changes to features
2. Remove or update obsolete tests
3. Keep test data up to date
4. Monitor test execution time and optimize slow tests
