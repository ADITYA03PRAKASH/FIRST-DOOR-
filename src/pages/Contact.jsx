import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, Map } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | First Door HR Solutions | Corporate Consultation</title>
        <meta name="description" content="Reach out to First Door HR Solutions Noida. Fill out our corporate inquiry form, view coordinates, working hours, and request a free HR consultation audit." />
        <link rel="canonical" href="https://www.firstdoorhr.com/contact" />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-navy-dark to-navy pt-40 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(198,146,46,0.15)_0%,transparent_50%)] z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">Connect With Us</h1>
              <nav className="flex text-xs font-body uppercase tracking-wider text-white/60">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                <span className="mx-2 text-gold">/</span>
                <span className="text-gold">Contact</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Form Details (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block font-semibold">INQUIRIES</span>
              <h2 className="text-navy font-headings font-extrabold text-3xl md:text-4xl leading-tight">
                Schedule a Consultation
              </h2>
              <p className="text-gray-500 font-body text-sm md:text-base leading-relaxed mb-8">
                Complete the diagnostic inquiry details below. A senior HR consultant will contact you within 24 business hours to evaluate your project.
              </p>

              {/* Form Component */}
              <ContactForm />
            </div>

            {/* Right Column: Office Coordinates Card (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="bg-navy text-white rounded-xl p-8 md:p-12 space-y-8 shadow-xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(198,146,46,0.06)_0%,transparent_50%)] pointer-events-none z-0" />
                
                <div className="relative z-10 space-y-4">
                  <h3 className="font-headings font-bold text-2xl text-white">Corporate Office</h3>
                  <p className="text-gray-300 font-body text-xs md:text-sm leading-relaxed">
                    Visit our Noida headquarters or connect directly with our advisory divisions. We maintain operational coverage across key corporate hubs.
                  </p>
                </div>

                <div className="relative z-10 space-y-6 pt-4 border-t border-white/5">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-xs uppercase tracking-wider text-white">Office Address</h4>
                      <p className="text-gray-300 font-body text-xs md:text-sm mt-1 leading-relaxed">
                        702, Premium Trade Towers, Business District,<br />Noida, Uttar Pradesh - 201301
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-xs uppercase tracking-wider text-white">Inquiry Email</h4>
                      <a href="mailto:letsconnect@firstdoorhr.com" className="text-gray-300 hover:text-gold font-body text-xs md:text-sm mt-1 block transition-colors">
                        letsconnect@firstdoorhr.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-xs uppercase tracking-wider text-white">Direct Phone</h4>
                      <a href="tel:+919911692679" className="text-gray-300 hover:text-gold font-body text-xs md:text-sm mt-1 block transition-colors">
                        9911692679
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-xs uppercase tracking-wider text-white">Working Hours</h4>
                      <p className="text-gray-300 font-body text-xs md:text-sm mt-1 leading-relaxed">
                        Monday to Friday: 9:00 AM to 6:00 PM (IST)
                      </p>
                      <span className="text-gold font-body text-[10px] uppercase font-bold block mt-1">We are off duties on national holidays.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-20 pt-8" data-aos="fade-up">
            <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block font-semibold">LOCATION</span>
            <h3 className="font-headings font-bold text-2xl text-navy mb-6">Our Geographic Coordinates</h3>
            
            <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative flex flex-col justify-center items-center bg-[#EBF1F6]">
              <div className="text-center p-8 max-w-xl">
                <Map className="h-12 w-12 text-gold mx-auto mb-4" />
                <h4 className="font-headings font-bold text-navy text-lg mb-2">Interactive Map Area</h4>
                <p className="text-gray-500 font-body text-xs leading-relaxed mb-6">
                  First Door HR Solutions Noida HQ - Noida. Near Premium Business Trade Center. Map placeholder with premium custom styling.
                </p>
                <a 
                  href="https://maps.google.com/?q=Noida+Premium+Trade+Towers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-gold hover:bg-gold hover:text-white text-gold font-body font-bold text-[10px] uppercase tracking-wider px-5 py-3 rounded-[4px] transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

