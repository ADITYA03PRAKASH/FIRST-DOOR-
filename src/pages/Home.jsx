import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import { CheckCircle2, ArrowRight } from 'lucide-react';



// Custom Components
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import IndustryCard from '../components/IndustryCard';


import Button from '../components/Button';
import CTA from '../components/CTA';

// Data Arrays
import { services } from '../data/services';
import { industries } from '../data/industries';


const whyChooseUsData = [
  { title: "Experienced HR Experts", desc: "Our advisors carry senior leadership backgrounds in global consulting networks, delivering enterprise-level intelligence." },
  { title: "Customized HR Solutions", desc: "We reject template-based work, building policy handbooks and agreements tailored to your operations." },
  { title: "Fast Recruitment Pipeline", desc: "Reduce your time-to-hire by 40% utilizing our pre-vetted database of top 5% passive candidates." },
  { title: "Compliance Specialists", desc: "Minimizing statutory liabilities through rigorous labor audit protocols and payroll verification cycles." },
  { title: "Business Growth Focus", desc: "We align talent strategies directly with your long-term commercial goals, scaling structures on demand." },
  { title: "Trusted Partnership", desc: "Get dedicated account managers checking in with quarterly efficiency reviews and post-onboarding audits." }
];

const Home = () => {
  // Stagger container animation configs
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <Helmet>
        <title>First Door HR Solutions | Elite HR Consulting & Recruitment</title>
        <meta name="description" content="Build a stronger workforce today. First Door HR Solutions delivers executive search, permanent recruitment, compliance audits, and payroll outsourcing." />
        <link rel="canonical" href="https://www.firstdoorhr.com/" />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* About Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Corporate consultants collaborating in boardroom" 
                className="rounded-xl shadow-xl w-full object-cover h-[450px]"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-[6px] border-gold/20 rounded-xl z-[-1] hidden md:block" />
            </motion.div>

            {/* Content Box */}
            <div className="space-y-6">
              <SectionTitle 
                tagline="ABOUT FIRST DOOR"
                title="Bridging Talent with Business Strategy"
              />
              <p className="text-gray-500 font-body text-base leading-relaxed">
                First Door HR Solutions is a premier corporate advisory that delivers next-generation Recruitment, Talent Acquisition, Talent Management, Payroll & Compliance Solutions, and Organizational Consulting. We help enterprise organizations and high-growth businesses design resilient workforces built for scaling.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 mb-6">
                <div>
                  <h4 className="font-headings font-bold text-navy text-lg mb-2">Our Mission</h4>
                  <p className="text-gray-400 font-body text-xs leading-relaxed">To empower organizations by delivering strategic HR methodologies that match the best human potential with matching corporate purposes.</p>
                </div>
                <div>
                  <h4 className="font-headings font-bold text-navy text-lg mb-2">Our Vision</h4>
                  <p className="text-gray-400 font-body text-xs leading-relaxed">To be the global benchmark in HR consulting, recognized for integrity, custom-fit frameworks, and executive-level search precision.</p>
                </div>
              </div>

              <div className="pt-2">
                <Button to="/about" variant="navy" className="flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-brandBgLight">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="OUR DISTINCTIONS"
            title="Why Should Corporate Clients Choose Us"
            center
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUsData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-premium hover:border-gold/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-gold"><CheckCircle2 className="h-6 w-6" /></div>
                  <h3 className="font-headings font-bold text-lg text-navy">{item.title}</h3>
                  <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="CORE CAPABILITIES"
            title="Our HR Solutions & Services"
            center
          />

          {/* Show first 6 services on homepage preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 6).map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>

          <div className="text-center">
            <Button to="/services" variant="outline-gold">
              Explore All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Preview Section */}
      <section className="py-24 bg-brandBgLight">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="SECTOR SPECIALIZATIONS"
            title="Industries We Serve"
            center
          />

          {/* Show first 4 industries on homepage preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {industries.slice(0, 4).map((industry, idx) => (
              <IndustryCard key={industry.id} industry={industry} index={idx} />
            ))}
          </div>

          <div className="text-center">
            <Button to="/industries" variant="outline-gold">
              View All Sectors
            </Button>
          </div>
        </div>
      </section>





      {/* Final CTA Section */}
      <CTA />
    </>
  );
};

export default Home;

