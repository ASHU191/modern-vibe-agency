
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        scrolled ? 'glass bg-white/70 backdrop-blur-md' : 'bg-transparent',
        scrolled ? 'border-b border-gray-100' : 'border-b border-transparent',
        className
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="font-display text-xl font-semibold tracking-tight">Cubic</span>
          <span className="ml-1 rounded-full bg-black w-2 h-2"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm font-medium relative group transition-colors"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-2xl font-medium relative group transition-colors"
              onClick={closeMobileMenu}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
