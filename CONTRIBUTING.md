# Contributing to Pasumai AI

## Code of Conduct

Please be respectful and inclusive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Standards

### Code Style

**Frontend (TypeScript/React)**
- Use functional components with hooks
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Component names in PascalCase
- File names in PascalCase

**Backend (TypeScript/Node.js)**
- Use async/await for asynchronous operations
- Follow TypeScript strict mode
- Use meaningful variable names
- Add JSDoc comments for functions
- File names in camelCase or kebab-case

**ML Service (Python)**
- Follow PEP 8 style guide
- Use type hints
- Add docstrings to functions
- File names in snake_case

### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(scanner): add image upload preview

Added ability to preview selected images before scanning.
Implemented drag-and-drop functionality.

Closes #123
```

## Pull Request Process

1. Update the README.md with any new features
2. Ensure all tests pass
3. Follow the code style guidelines
4. Request review from maintainers
5. Address review comments
6. Squash commits if requested

## Testing

Before submitting a PR:

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test

# ML Service
cd ml-service && python -m pytest
```

## Documentation

- Update README.md for user-facing changes
- Add docstrings for new functions
- Update API documentation for new endpoints
- Include examples for new features

## Questions?

Create a GitHub issue or discussion for questions.
