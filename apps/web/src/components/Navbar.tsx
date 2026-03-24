import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/logo ter.png"
            alt="Iteros Logo"
            className="h-8 w-auto" // Ajustez la hauteur selon vos besoins
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`font-body text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location.pathname === item.href ? 'text-white' : 'text-muted-foreground hover:text-white/80'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/booking"
          className="hidden md:inline-block font-body text-xs tracking-[0.3em] uppercase px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full"
        >
          Book a Table
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-body text-sm tracking-[0.2em] uppercase transition-colors ${
                    location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
