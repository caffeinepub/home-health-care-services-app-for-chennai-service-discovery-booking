import { useNavigate, useParams } from '@tanstack/react-router';
import { useService } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { serviceId } = useParams({ from: '/services/$serviceId' });
  const { data: service, isLoading, error } = useService(serviceId);

  const handleBookService = () => {
    navigate({ to: '/booking', search: { serviceId } });
  };

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container py-8 md:py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Service not found or failed to load. Please try again.
          </AlertDescription>
        </Alert>
        <Button variant="outline" className="mt-4" onClick={() => navigate({ to: '/services' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" onClick={() => navigate({ to: '/services' })}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Services
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.name}</h1>
            <p className="text-lg text-muted-foreground">{service.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Duration</h3>
                  <p className="text-sm text-muted-foreground">
                    Typically 45-60 minutes per visit. Actual duration may vary based on patient needs.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Coverage Areas in Chennai</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Adyar', 'Anna Nagar', 'T. Nagar', 'Velachery', 'Mylapore', 'Nungambakkam', 'Besant Nagar', 'Alwarpet'].map(
                      (area) => (
                        <Badge key={area} variant="secondary">
                          {area}
                        </Badge>
                      )
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    And many more areas across Chennai
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">What's Included</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Certified and experienced healthcare professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>All necessary medical equipment and supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Detailed care documentation and progress reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>24/7 support for emergencies and queries</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Book This Service</CardTitle>
              <CardDescription>Schedule a visit at your convenience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold">₹{service.pricePerVisit.toString()}</span>
                  <span className="text-sm text-muted-foreground">per visit</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Transparent pricing with no hidden charges
                </p>
              </div>

              <Button className="w-full" size="lg" onClick={handleBookService}>
                Book Now
              </Button>

              <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Flexible scheduling
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Easy cancellation
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Verified professionals
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
