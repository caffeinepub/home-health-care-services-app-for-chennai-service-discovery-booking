import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useServices } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CHENNAI_LOCALITIES = [
  'All Areas',
  'Adyar',
  'Anna Nagar',
  'T. Nagar',
  'Velachery',
  'Mylapore',
  'Nungambakkam',
  'Besant Nagar',
  'Alwarpet',
  'Kodambakkam',
  'Porur',
];

export default function Services() {
  const navigate = useNavigate();
  const { data: services, isLoading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All Areas');

  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      const matchesSearch =
        searchTerm === '' ||
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [services, searchTerm]);

  const handleViewDetails = (serviceId: bigint) => {
    navigate({ to: '/services/$serviceId', params: { serviceId: serviceId.toString() } });
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Services</h1>
        <p className="text-muted-foreground">
          Browse our comprehensive range of home healthcare services available across Chennai
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Services</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by service name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locality">Filter by Locality</Label>
            <Select value={selectedLocality} onValueChange={setSelectedLocality}>
              <SelectTrigger id="locality">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {CHENNAI_LOCALITIES.map((locality) => (
                  <SelectItem key={locality} value={locality}>
                    {locality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {(searchTerm || selectedLocality !== 'All Areas') && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedLocality('All Areas');
              }}
            >
              Clear Filters
            </Button>
            <span className="text-sm text-muted-foreground">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load services. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found matching your criteria.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id.toString()} className="flex flex-col">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">₹{service.pricePerVisit.toString()}</span>
                  <span className="text-sm text-muted-foreground">per visit</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleViewDetails(service.id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
