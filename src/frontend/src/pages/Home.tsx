import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Heart, Clock, Shield, Users } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Quality Healthcare at Your Doorstep in Chennai
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Professional home health care services delivered with compassion and expertise. From nursing care to physiotherapy, we bring healthcare home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate({ to: '/services' })}>
                  Browse Services
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate({ to: '/my-bookings' })}>
                  View My Bookings
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/assets/generated/hhc-chennai-hero.dim_1600x900.png"
                alt="Home healthcare services in Chennai"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional home healthcare services across Chennai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Compassionate Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our trained professionals provide care with empathy and respect for your loved ones.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Certified Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All our healthcare professionals are certified and experienced in their fields.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book appointments at your convenience with flexible timing options.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Chennai-Wide Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We serve all major localities across Chennai including Adyar, T. Nagar, Velachery, and more.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Browse our comprehensive range of home healthcare services and book your appointment today.
            </p>
            <Button size="lg" onClick={() => navigate({ to: '/services' })}>
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
