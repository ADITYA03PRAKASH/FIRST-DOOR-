import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { industries } from '../data/industries';

const Industries = () => {
  return (
    <>
      <Helmet>
        <title>Sectors We Serve | First Door HR Solutions</title>
        <meta name="description" content="Discover how we provide tailored HR strategies, payroll handling, and recruiting networks for Healthcare, IT, Construction, Retail, Government, and Startups." />
        <link rel="canonical" href="https://www.firstdoorhr.com/industries" />
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
            <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">Sectors We Serve</h1>
            <nav className="flex text-xs font-body uppercase tracking-wider text-white/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2 text-gold">/</span>
              <span className="text-gold">Industries</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Industry Details Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16" data-aos="fade-up">
            <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">OUR SCOPE</span>
            <h2 className="text-navy font-headings font-extrabold text-3xl md:text-4xl leading-tight">
              Customized HR & Staffing Across Major Sectors
            </h2>
            <p className="text-gray-500 font-body text-base mt-4 leading-relaxed">
              Different industries carry different HR requirements, wage structures, and compliance standards. First Door HR Solutions deploys specialized recruiting teams and consultants trained specifically in the legal and structural parameters of each sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-premium hover:border-gold/20 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Sector Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={ind.image} 
                    alt={ind.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/10 z-10" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-headings font-bold text-navy text-xl group-hover:text-gold transition-colors duration-300">
                      {ind.title}
                    </h3>
                    <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  {/* Key Services bullets inside card */}
                  <div className="border-t border-gray-100 pt-4 flex-grow flex flex-col justify-end">
                    <h4 className="font-body font-bold text-[10px] uppercase tracking-wider text-navy mb-3">Key Focus Areas</h4>
                    <ul className="space-y-1.5 mb-6">
                      {ind.keyServices.map((srv, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                          <span className="text-gray-400 font-body text-xs">{srv}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Sector Link */}
                    <Link 
                      to={`/contact?sector=${ind.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors duration-300 self-start"
                    >
                      Sector Inquiry 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Industries;

