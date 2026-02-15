# Specification

## Summary
**Goal:** Ensure the Services page shows a larger catalog by seeding the backend with additional service packages on a fresh install.

**Planned changes:**
- Add backend seed logic to pre-populate services when the services list is empty.
- Include at least 8 distinct service packages, each with an English name/description and a non-zero price per visit.
- Ensure the seeding runs only once and does not create duplicates if services already exist.

**User-visible outcome:** On a fresh install, the Services page displays a non-empty catalog (at least 8 services) without requiring manual service creation.
