import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useUserBookings } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from '@tanstack/react-router';
import { Calendar, MapPin, Loader2, AlertCircle } from 'lucide-react';

export default function MyBookings() {
  const navigate = useNavigate();
  const { identity, login, isLoginSuccess } = useInternetIdentity();
  const { data: bookings, isLoading } = useUserBookings(identity?.getPrincipal());

  if (!isLoginSuccess) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>
                Please login to view your bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button onClick={login}>Login</Button>
              <Button variant="outline" onClick={() => navigate({ to: '/services' })}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your service booking requests
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && bookings && bookings.length === 0 && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>No Bookings Yet</CardTitle>
            <CardDescription>
              You haven't made any booking requests yet. Browse our services to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate({ to: '/services' })}>
              Browse Services
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && bookings && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Booking #{booking.id.toString()}</CardTitle>
                    <CardDescription className="mt-1">
                      Service ID: {booking.serviceId.toString()}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      booking.status === 'Pending'
                        ? 'secondary'
                        : booking.status === 'Confirmed'
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{booking.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Requested Date & Time</p>
                    <p className="text-muted-foreground">{booking.requestedDate}</p>
                  </div>
                </div>

                {booking.status === 'Pending' && (
                  <Alert>
                    <AlertDescription>
                      Our team will contact you shortly to confirm your appointment.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
