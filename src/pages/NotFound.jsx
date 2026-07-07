import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | First Door HR Solutions</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="min-h-[80vh] flex items-center justify-center bg-brandBgLight py-20 px-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <span className="text-gold font-body font-bold text-xs uppercase tracking-[4px] block">
              ERROR CODE 404
            </span>
            <h1 className="font-headings font-extrabold text-7xl md:text-8xl text-navy">
              404
            </h1>
            <h2 className="font-headings font-bold text-2xl text-navy leading-tight">
              Page Not Found
            </h2>
            <p className="text-gray-500 font-body text-sm leading-relaxed max-w-sm mx-auto">
              The corporate resource or advisory page you are looking for has been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="pt-2">
            <Button to="/" variant="navy" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" /> Back to Homepage
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

