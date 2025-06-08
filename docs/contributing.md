# Contributing Guidelines

Thank you for your interest in contributing to the Robo Events Platform! Here's how you can help.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Style](#code-style)
5. [Testing](#testing)
6. [Pull Requests](#pull-requests)
7. [Reporting Issues](#reporting-issues)
8. [Documentation](#documentation)
9. [Community](#community)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- Git
- Docker and Docker Compose
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Robo_Events.git
   cd Robo_Events
   ```
3. Set up the development environment:
   ```bash
   # Copy environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   
   # Start services
   docker-compose up -d
   
   # Install dependencies
   docker-compose exec backend pip install -r requirements-dev.txt
   cd frontend && npm install
   ```

## Development Workflow

### Branch Naming

Use the following format: `type/description`

Types:
- `feature/`: New features
- `bugfix/`: Bug fixes
- `hotfix/`: Critical production fixes
- `docs/`: Documentation changes
- `refactor/`: Code refactoring
- `test/`: Test updates

Example: `feature/user-authentication`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Example:
```
feat(auth): add password reset functionality

- Add password reset endpoint
- Implement email service
- Update documentation

Closes #123
```

## Code Style

### Backend (Python)

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
- Use type hints
- Maximum line length: 88 characters (Black)
- Sort imports with isort
- Format with Black

### Frontend (TypeScript/React)

- Use TypeScript strict mode
- Follow Airbnb Style Guide
- Use functional components with hooks
- Use absolute imports
- Format with Prettier

## Testing

### Backend Tests

```bash
# Run all tests
docker-compose exec backend pytest

# Run specific test file
docker-compose exec backend pytest path/to/test_file.py

# Run with coverage
docker-compose exec backend pytest --cov=.
```

### Frontend Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for your changes
4. Update documentation
5. Run linters and tests
6. Push to your fork
7. Open a pull request

### PR Template

```markdown
## Description

[Description of changes]

## Related Issues

- Fixes #123
- Related to #456

## Checklist

- [ ] Tests added
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Ready for review
```

## Reporting Issues

### Bug Reports

1. Check existing issues
2. Use the bug report template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details
   - Screenshots if applicable

### Feature Requests

1. Check existing requests
2. Describe the feature
3. Explain the use case
4. Provide examples

## Documentation

### Updating Documentation

1. Update relevant `.md` files
2. Update API documentation if needed
3. Ensure examples work
4. Follow the style guide

### Generating API Docs

```bash
# Generate OpenAPI schema
python manage.py generateschema > openapi-schema.yml

# View docs locally
python -m http.server 8001 --directory docs/
```

## Community

### Getting Help

- [GitHub Discussions](https://github.com/your-org/Robo_Events/discussions)
- [Discord/Slack Channel](#)

### Core Team

- [@maintainer1](https://github.com/maintainer1)
- [@maintainer2](https://github.com/maintainer2)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
