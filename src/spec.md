# Specification

## Summary
**Goal:** Add a new Cancer Care service package to the backend service catalog so it appears in the Services list and can be booked like other services.

**Planned changes:**
- Pre-populate the backend catalog with a new “Cancer Care” service entry including an English description and a non-zero pricePerVisit.
- Ensure the new service is retrievable via getServices() and getService(serviceId) without errors.
- Ensure bookings can be created for the Cancer Care service via requestBooking and are returned in getUserBookings.

**User-visible outcome:** Users can see the new Cancer Care service in the Services list, open its details, and submit a booking for it like any other service.
