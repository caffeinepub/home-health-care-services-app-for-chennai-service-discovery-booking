# Specification

## Summary
**Goal:** Build the core service discovery and booking flows for a Chennai-focused Home Health Care Services app, backed by persistent storage in a single Motoko actor.

**Planned changes:**
- Backend: add typed data models and APIs to list services, fetch service details by id, create booking requests, and list a user’s submitted bookings (using authenticated user or stable anonymous identifier).
- Frontend: create pages for Home (Chennai landing), Services (search + filters), Service Details, and Booking form; connect all reads/writes via React Query with loading/success/error states.
- Frontend: implement booking form validation for required fields and show a confirmation state after submission.
- Frontend: apply a consistent healthcare-appropriate visual theme (English text), avoiding a blue/purple-dominant palette.
- Frontend: add static generated image assets (logo + hero) under `frontend/public/assets/generated` and display them in the header and Home page.

**User-visible outcome:** Users can browse and filter Chennai home health care services, view full service details, submit a booking request, see a confirmation, and review their submitted bookings.
