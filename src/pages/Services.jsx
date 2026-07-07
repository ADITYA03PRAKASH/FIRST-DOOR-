import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Crown, 
  UserCheck, 
  Clock, 
  Users, 
  UserCog, 
  BookOpen, 
  FileSpreadsheet, 
  ShieldAlert, 
  BarChart3, 
  GraduationCap, 
  Heart, 
  Laptop,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import { services } from '../data/services';

const iconMap = {
  Crown: Crown,
  UserCheck: UserCheck,
  Clock: Clock,
  Users: Users,
  UserGear: UserCog,
  BookOpen: BookOpen,
  FileInvoiceDollar: FileSpreadsheet,
  ShieldAlert: ShieldAlert,
  BarChart3: BarChart3,
  GraduationCap: GraduationCap,
  HeartPulse: Heart,
  Laptop: Laptop
};

const categories = [
  { id: 'talent-acquisition', label: 'Talent Acquisition', desc: 'Sourcing, headhunting, and staffing solutions.' },
  { id: 'hr-consulting', label: 'HR Consulting', desc: 'Workforce design, handbooks, and strategy.' },
  { id: 'compliance-payroll', label: 'Compliance & Payroll', desc: 'Provident funds, audits, and salary processing.' },
  { id: 'people-development', label: 'People & Development and HR Operation Solutions', desc: 'Appraisals, workshops, operations, and coaching cycles.' }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('talent-acquisition');
  const { hash } = useLocation();

  // Scroll to hash on load (e.g. from homepage jump link /services#executive-search)
  useEffect(() => {
    if (hash) {
      const cleanHash = hash.replace('#', '');
      const element = document.getElementById(cleanHash);
      if (element) {
        // Find which category this service belongs to and set active tab
        const matchedService = services.find(s => s.id === cleanHash);
        if (matchedService) {
          setActiveCategory(matchedService.category);
        }
        
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [hash]);

  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our HR Services | First Door HR Solutions</title>
        <meta name="description" content="Explore our full HR portfolio: Executive Search, Permanent Recruiting, Statutory Audits, Payroll Outsourcing, Performance Appraisals, and HRIS systems." />
        <link rel="canonical" href="https://www.firstdoorhr.com/services" />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-navy-dark to-navy pt-40 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(198,146,46,0.15)_0%,transparent_50%)] z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">Our HR Portfolios</h1>
            <nav className="flex text-xs font-body uppercase tracking-wider text-white/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2 text-gold">/</span>
              <span className="text-gold">Services</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Main Tabbed Layout Container */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* Sidebar Sticky Category Selector */}
            <div className="lg:col-span-1 lg:sticky lg:top-28 z-30 space-y-6">
              <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">PORTFOLIOS</span>
              <h2 className="text-navy font-headings font-bold text-2xl mb-6">HR Capabilities</h2>
              
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      w-full text-left py-4 px-5 rounded-[4px] border font-body font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-between
                      ${activeCategory === cat.id 
                        ? 'bg-navy border-navy text-white shadow-md' 
                        : 'bg-white border-gray-200 text-navy hover:bg-brandBgLight hover:border-gold/30'}
                    `}
                  >
                    <span>{cat.label}</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${activeCategory === cat.id ? 'translate-x-1' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>

              {/* Consultation sidebar callout card */}
              <div className="bg-navy text-white p-6 rounded-xl border border-white/5 space-y-4 shadow-lg hidden lg:block">
                <h4 className="font-headings font-bold text-gold text-lg">Need a Custom Audit?</h4>
                <p className="text-gray-300 font-body text-xs leading-relaxed">
                  Let our senior consultants run a statutory payroll and policy risk audit on your company.
                </p>
                <Button to="/contact?service=hr-audit" variant="gold" className="w-full text-center py-3">
                  Enquire Now
                </Button>
              </div>
            </div>

            {/* Right Side Category Detail Cards */}
            <div className="lg:col-span-3 space-y-12">
              {/* Category Header */}
              <div className="border-b border-gray-200 pb-6">
                <span className="text-gold font-body font-bold text-xs uppercase tracking-widest">
                  {categories.find(c => c.id === activeCategory)?.label.toUpperCase()}
                </span>
                <h2 className="text-navy font-headings font-extrabold text-3xl mt-1 mb-3">
                  {categories.find(c => c.id === activeCategory)?.label} Solutions
                </h2>
                <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">
                  {categories.find(c => c.id === activeCategory)?.desc}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="space-y-8">
                {filteredServices.map((service, idx) => {
                  const Icon = iconMap[service.icon] || Users;
                  return (
                    <motion.div
                      key={service.id}
                      id={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="bg-white border border-gray-200 rounded-xl p-8 hover:border-gold/25 hover:shadow-premium transition-all duration-300 flex flex-col justify-between scroll-mt-28"
                    >
                      <div>
                        {/* Title and Icon */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-lg bg-gold/5 text-gold flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-navy font-headings font-bold text-xl md:text-2xl">{service.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Features & Benefits Split Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          {/* Benefits */}
                          <div>
                            <h4 className="font-body font-bold text-xs uppercase tracking-wider text-gold mb-3">Client Benefits</h4>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="h-4.5 w-4.5 text-gold flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-400 font-body text-xs leading-relaxed">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Features */}
                          <div>
                            <h4 className="font-body font-bold text-xs uppercase tracking-wider text-navy mb-3">Service Scope</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="h-4.5 w-4.5 text-navy flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-400 font-body text-xs leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="border-t border-gray-100 pt-6">
                        <Button to={service.ctaLink} variant="navy" className="py-2.5 px-6">
                          Request Portfolio consultation
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

