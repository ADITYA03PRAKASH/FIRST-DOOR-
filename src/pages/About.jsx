import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Scissors, Award, ShieldCheck, Database, FileSpreadsheet } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const valuesData = [
  { icon: Scale, title: "Integrity & Transparency", desc: "We believe in absolute honesty. From detailing candidate profiles to structuring pricing contracts, we operate in full alignment with our clients." },
  { icon: Scissors, title: "Bespoke Engineering", desc: "We reject generic formulas. Every organization design and compliance handbook we create is tailored specifically for your operational model." },
  { icon: Award, title: "Premium Excellence", desc: "We hold ourselves to the highest standards. We search extensively to find candidates that meet your specific professional expectations." }
];



const methodologyData = [
  { id: "01", title: "Discovery & Diagnostic", desc: "We initiate our partnership with a deep diagnostic review of your company's operational hierarchy, current employment liability, skill gaps, and scaling timeline goals." },
  { id: "02", title: "HR Infrastructure Audit", desc: "Our senior compliance and payroll specialists run a comprehensive audit on your current agreements, statutory tax filings, and insurance coverages to clean up liabilities." },
  { id: "03", title: "Strategy Engineering", desc: "We design a custom workforce model. This contains targeted candidate specifications, compliant handbook updates, payroll automations, and training paths." },
  { id: "04", title: "Systematic Execution", desc: "Our recruitment engines execute targeted headhunting pipelines, while our consulting consultants implement the structural upgrades across your organization." },
  { id: "05", title: "Continuous Calibration", desc: "We conduct regular performance reviews, employee engagement checks, and compliance updates to keep your organization running smoothly." }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | First Door HR Solutions | Elite Corporate HR</title>
        <meta name="description" content="Learn about First Door HR Solutions. Discover our story, mission, core values, leadership team, and executive consulting methodology." />
        <link rel="canonical" href="https://www.firstdoorhr.com/about" />
      </Helmet>

      {/* Page Banner Header */}
      <section className="relative bg-gradient-to-r from-navy-dark to-navy pt-40 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(198,146,46,0.15)_0%,transparent_50%)] z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">About Our Consultancy</h1>
            <nav className="flex text-xs font-body uppercase tracking-wider text-white/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2 text-gold">/</span>
              <span className="text-gold">About Us</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">OUR BEGINNINGS</span>
              <h2 className="text-navy font-headings font-extrabold text-3xl md:text-4xl leading-tight">
                A Legacy of Executive Placement and HR Precision
              </h2>
              <p className="text-gray-500 font-body text-base leading-relaxed">
                Founded over 15 years ago, First Door HR Solutions was established to replace transactional recruitment with strategic human capital partnerships. We realized that corporate growth succeeds or fails based on one factor: placing the right leaders and builders in the right structures.
              </p>
              <p className="text-gray-400 font-body text-sm leading-relaxed">
                Starting as a boutique executive search firm, we expanded our capabilities into full-scale HR advisory, compliance audits, payroll services, and corporate leadership development. Today, we stand as a trusted advisory partner to over 500 organizations, helping them navigate complex labor legislations and build agile teams.
              </p>
              <p className="text-gray-400 font-body text-sm leading-relaxed">
                Our consultants bring high-level expertise from top tier global consulting firms, combining modern talent technology with direct, personal business audits.
              </p>
            </motion.div>

            {/* Story Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                alt="Corporate office building representing trust and stability" 
                className="rounded-xl shadow-xl w-full object-cover h-[450px]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Dark Gradient backdrop) */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(198,146,46,0.08)_0%,transparent_50%)] z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-headings font-bold text-2xl text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 font-body text-sm leading-relaxed">
                Our mission is to translate complex human potential into measurable commercial success. We do this by developing bespoke HR infrastructures, compliant payroll architectures, and executive hiring strategies that align perfectly with our clients' cultural and financial targets.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-6">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-headings font-bold text-2xl text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 font-body text-sm leading-relaxed">
                Our vision is to remain the gold standard in premium HR advisories, continuously evolving our tech-enabled systems to deliver unmatched speed-to-hire, perfect statutory compliance audits, and strategic talent development modules for high-growth enterprises worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="OUR PRINCIPLES"
            title="The Values That Guide Us"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-premium hover:border-gold/25 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/5 text-gold flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-headings font-bold text-xl text-navy mb-3">{val.title}</h3>
                  <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section (Curved alternating cards timeline) */}
      <section className="py-24 bg-brandBgLight">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="THE METHODOLOGY"
            title="How We Deliver Results"
            center
          />

          <div className="relative max-w-4xl mx-auto py-8">
            {/* Center Timeline Connector Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-gray-200 -translate-x-1/2" />

            <div className="space-y-16">
              {methodologyData.map((method, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col md:flex-row items-stretch relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 top-6 w-5 h-5 rounded-full bg-white border-4 border-gold z-10 -translate-x-1/2" />

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0">
                      <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-premium hover:border-gold/20 transition-all duration-300"
                      >
                        <span className="text-3xl font-body font-extrabold text-gold/15 leading-none mb-2 block">
                          {method.id}
                        </span>
                        <h4 className="font-serif text-navy font-bold text-lg mb-3">
                          {method.title}
                        </h4>
                        <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                          {method.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Spacer for offset columns */}
                    <div className="hidden md:block w-[10%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* Trust Indicators Section */}
      <section className="py-24 bg-navy text-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">TRUST FACTORS</span>
              <h2 className="text-white font-headings font-extrabold text-3xl md:text-4xl leading-tight">
                Why Premium Firms Put Their Trust In Us
              </h2>
              <p className="text-gray-300 font-body text-sm leading-relaxed">
                Building a compliant, resilient organization requires a partner who understands both local legislation and international talent expectations.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-sm text-white">Full-Suite Legal Coverage</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Our legal advisors constantly monitor reforms, updating your policies to protect you from compliance risks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-sm text-white">Strict Data Privacy</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">We enforce strict data encryption standards for payroll administration and candidate screening databases.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-sm text-white">Transparent Reporting</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Get access to custom reports detailing hiring times, cost-per-hire, and audit results.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
                alt="Executive presentation meeting" 
                className="rounded-xl shadow-xl w-full object-cover h-[400px]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

