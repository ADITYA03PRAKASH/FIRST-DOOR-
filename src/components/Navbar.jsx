import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo/Logo';
import LogoWhite from '../assets/logo/LogoWhite';
import Button from './Button';

const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/industries', label: 'Industries' },
  { path: '/resources', label: 'Resources' },
  { path: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll event observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navStyles = isScrolled 
    ? "bg-white/95 backdrop-blur-md border-b border-navy/5 shadow-premium py-3" 
    : "bg-transparent py-5";

  const linkColor = isScrolled ? "text-navy hover:text-gold" : "text-white/90 hover:text-gold";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navStyles}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            {isScrolled ? (
              <Logo className="h-10 md:h-12 w-auto transition-transform duration-300" />
            ) : (
              <LogoWhite className="h-10 md:h-12 w-auto transition-transform duration-300" />
            )}
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  font-body font-semibold text-xs tracking-wider uppercase px-4 py-2 relative group transition-colors duration-300
                  ${isActive ? 'text-gold' : linkColor}
                `}
              >
                {link.label}
                {/* Underline Hover Animation */}
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </NavLink>
            ))}
            
            {/* CTA Button */}
            <Button to="/contact" variant="gold" className="ml-4 py-2.5 px-6">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Toggle Navigation Drawer"
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-40 w-full md:w-80 bg-navy shadow-2xl flex flex-col justify-between p-8 pt-24"
          >
            {/* Link links */}
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    font-body font-bold text-lg tracking-widest uppercase py-4 border-b border-white/5 transition-colors duration-200
                    ${isActive ? 'text-gold' : 'text-white/80 hover:text-gold'}
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Bottom CTA */}
            <div className="mt-8">
              <Button to="/contact" variant="gold" className="w-full py-4">
                Book Consultation
              </Button>
              <p className="text-[10px] text-white/40 text-center font-body mt-4">
                &copy; 2026 First Door HR Solutions.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

