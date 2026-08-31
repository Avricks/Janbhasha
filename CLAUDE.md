# Claude Instructions for Janbhasha Development

This file contains instructions for Claude AI assistants working on the Janbhasha project.

## Project Overview

Janbhasha is an educational platform for teaching regional Indian languages with AI-powered personalized learning, offline support, and inclusive pedagogy.

## Key Principles

1. **Inclusivity First**: Always consider accessibility for learners with varying tech literacy
2. **Offline Support**: Design solutions that work in low-bandwidth scenarios
3. **Language Respect**: Maintain cultural and linguistic accuracy for Santhali, Mundari, and Ho
4. **Pedagogical Sound**: Base features on established educational principles
5. **Privacy & Security**: Protect learner and teacher data rigorously

## Codebase Structure

- **apps/**: Mobile and web interfaces
- **services/**: Backend microservices
- **ai/**: ML models and NLP pipelines
- **packages/**: Shared utilities and domain logic
- **.ai/**: Agent rules, skills, and decision trees

## Workflow Guidelines

### When Adding Features

1. Check existing agent rules in `.ai/rules/`
2. Review relevant skills in `.ai/skills/`
3. Update or create SKILL.md documentation
4. Ensure tests are comprehensive
5. Update relevant documentation

### When Debugging

1. Start with the architecture docs
2. Check the relevant service's README
3. Verify environment configuration
4. Use test suites to isolate issues
5. Document learnings in relevant agent docs

### Code Style

- Follow language-specific conventions (ESLint, Black, etc.)
- Use meaningful names reflecting domain concepts
- Comment complex algorithms
- Write testable, modular code

## Important Contacts & Resources

- Security issues: security@janbhasha.dev
- Documentation: See `/docs` and `.ai/` directories
- Rules & Guidelines: `.ai/rules/` (especially global.md)

## Agent-Specific Notes

- **Backend Agent**: Focused on API services and data consistency
- **Android Agent**: Handles mobile UI, offline sync, performance
- **AI/NLP Agent**: Manages language models and translation pipelines
- **Speech Agent**: Handles speech recognition and synthesis
- **Security Agent**: Reviews auth, data protection, compliance

---

For detailed information, see the `.ai/` directory and relevant SKILL.md files.
