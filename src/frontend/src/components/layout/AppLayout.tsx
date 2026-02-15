import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { identity, login, clear, isLoginSuccess } = useInternetIdentity();

  const handleAuthAction = () => {
    if (isLoginSuccess) {
      clear();
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/generated/hhc-chennai-logo.dim_512x512.png"
              alt="Chennai Home Health Care"
              className="h-10 w-10 rounded-lg"
            />
            <span className="font-semibold text-lg hidden sm:inline-block">
              Chennai Home Health Care
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              Services
            </Link>
            <Link
              to="/my-bookings"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              My Bookings
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAuthAction}
              className="hidden sm:inline-flex"
            >
              {isLoginSuccess ? 'Logout' : 'Login'}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate({ to: '/services' })}
              className="hidden sm:inline-flex"
            >
              Book Now
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container py-4 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm font-medium py-2 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium py-2 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/my-bookings"
                className="text-sm font-medium py-2 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleAuthAction();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                {isLoginSuccess ? 'Logout' : 'Login'}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  navigate({ to: '/services' });
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/assets/generated/hhc-chennai-logo.dim_512x512.png"
                  alt="Chennai Home Health Care"
                  className="h-8 w-8 rounded-lg"
                />
                <span className="font-semibold">Chennai Home Health Care</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Quality healthcare services delivered to your home in Chennai.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
                <Link to="/my-bookings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Bookings
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Serving all areas of Chennai
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1 flex-wrap">
              © {new Date().getFullYear()} Chennai Home Health Care. Built with{' '}
              <Heart className="h-4 w-4 text-accent fill-accent" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'hhc-chennai'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
