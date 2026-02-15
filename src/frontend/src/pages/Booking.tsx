import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useService, useRequestBooking } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

const CHENNAI_LOCALITIES = [
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
  'Tambaram',
  'Chrompet',
];

export default function Booking() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/booking' });
  const serviceId = (search as { serviceId?: string }).serviceId;
  const { data: service } = useService(serviceId);
  const { mutate: requestBooking, isPending, isSuccess, isError } = useRequestBooking();
  const { identity, login, isLoginSuccess } = useInternetIdentity();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    locality: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!serviceId) {
      navigate({ to: '/services' });
    }
  }, [serviceId, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.locality) {
      newErrors.locality = 'Please select a locality';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!isLoginSuccess) {
      login();
      return;
    }

    if (!serviceId) {
      return;
    }

    const fullAddress = `${formData.address}, ${formData.locality}, Chennai`;
    const requestedDateTime = `${formData.preferredDate} ${formData.preferredTime}`;

    requestBooking({
      serviceId: BigInt(serviceId),
      address: fullAddress,
      requestedDate: requestedDateTime,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Booking Request Submitted!</CardTitle>
              <CardDescription>
                Your booking request has been successfully submitted. Our team will contact you shortly to confirm the appointment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Service:</span> {service?.name}
                </p>
                <p>
                  <span className="font-semibold">Patient:</span> {formData.patientName}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {formData.locality}, Chennai
                </p>
                <p>
                  <span className="font-semibold">Preferred Date & Time:</span> {formData.preferredDate} at {formData.preferredTime}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => navigate({ to: '/my-bookings' })}>
                  View My Bookings
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate({ to: '/services' })}>
                  Browse More Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" onClick={() => navigate({ to: '/services' })}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Services
      </Button>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Service</h1>
          <p className="text-muted-foreground">
            Fill in the details below to request a booking
          </p>
        </div>

        {service && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>₹{service.pricePerVisit.toString()} per visit</CardDescription>
            </CardHeader>
          </Card>
        )}

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Failed to submit booking request. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">
                  Patient Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient's full name"
                  value={formData.patientName}
                  onChange={(e) => handleChange('patientName', e.target.value)}
                  className={errors.patientName ? 'border-destructive' : ''}
                />
                {errors.patientName && (
                  <p className="text-sm text-destructive">{errors.patientName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locality">
                  Locality <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.locality} onValueChange={(value) => handleChange('locality', value)}>
                  <SelectTrigger id="locality" className={errors.locality ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your locality in Chennai" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHENNAI_LOCALITIES.map((locality) => (
                      <SelectItem key={locality} value={locality}>
                        {locality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.locality && (
                  <p className="text-sm text-destructive">{errors.locality}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Full Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="House/Flat number, Street name, Landmark"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={errors.address ? 'border-destructive' : ''}
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">
                    Preferred Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => handleChange('preferredDate', e.target.value)}
                    className={errors.preferredDate ? 'border-destructive' : ''}
                  />
                  {errors.preferredDate && (
                    <p className="text-sm text-destructive">{errors.preferredDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">
                    Preferred Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => handleChange('preferredTime', e.target.value)}
                    className={errors.preferredTime ? 'border-destructive' : ''}
                  />
                  {errors.preferredTime && (
                    <p className="text-sm text-destructive">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or medical conditions we should know about"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Booking Request'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: '/services' })}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
