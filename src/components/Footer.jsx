import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';
import LogoWhite from '../assets/logo/LogoWhite';
import Newsletter from './Newsletter';

const footerLinks = {
  company: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Industries Served', path: '/industries' },
    { label: 'Resources & Blog', path: '/resources' },
    { label: 'Contact Us', path: '/contact' }
  ],
  services: [
    { label: 'Talent Acquisition', path: '/services#talent-acquisition' },
    { label: 'Executive Search', path: '/services#executive-search' },
    { label: 'HR Consulting', path: '/services#hr-consulting' },
    { label: 'Compliance Audits', path: '/services#compliance' },
    { label: 'Payroll Outsourcing', path: '/services#payroll' },
    { label: 'Leadership Development', path: '/services#leadership-development' }
  ]
};

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white/70 pt-20 pb-8 border-t border-white/5 font-body">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Description Column */}
          <div className="space-y-6">
            <Link to="/">
              <LogoWhite className="h-10 md:h-12 w-auto" />
            </Link>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed pr-4">
              First Door HR Solutions is a premier corporate advisory delivering modern recruitment, organization design, compliance audits, and payroll processing globally.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 text-white hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-300" aria-label="LinkedIn Profile">
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 text-white hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-300" aria-label="Twitter Profile">
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 text-white hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-300" aria-label="Facebook Profile">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 text-white hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-300" aria-label="YouTube Channel">
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-body font-bold text-white text-sm tracking-wider uppercase mb-6 relative pb-2 after:content-[''] after:block after:w-6 after:h-[2px] after:bg-gold after:mt-2">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-xs md:text-sm">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-gold flex items-center gap-1.5 transition-colors duration-200">
                    <span className="text-gold font-bold">â€º</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-body font-bold text-white text-sm tracking-wider uppercase mb-6 relative pb-2 after:content-[''] after:block after:w-6 after:h-[2px] after:bg-gold after:mt-2">
              Our Services
            </h4>
            <ul className="space-y-3.5 text-xs md:text-sm">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <a href={link.path} className="hover:text-gold flex items-center gap-1.5 transition-colors duration-200">
                    <span className="text-gold font-bold">â€º</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-body font-bold text-white text-sm tracking-wider uppercase mb-6 relative pb-2 after:content-[''] after:block after:w-6 after:h-[2px] after:bg-gold after:mt-2">
              HR Newsletter
            </h4>
            <p className="text-xs md:text-sm text-gray-400 mb-4 leading-relaxed">
              Subscribe to receive quarterly insights on statutory labor reforms, compliance checks, and workforce trends.
            </p>
            <Newsletter />
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 mt-12 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/resources#privacy" className="hover:text-gold transition-colors duration-200">Privacy Policy</Link>
            <Link to="/resources#terms" className="hover:text-gold transition-colors duration-200">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

