import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services,
});

const serviceDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$serviceId',
  component: ServiceDetails,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: Booking,
});

const myBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-bookings',
  component: MyBookings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  serviceDetailsRoute,
  bookingRoute,
  myBookingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
