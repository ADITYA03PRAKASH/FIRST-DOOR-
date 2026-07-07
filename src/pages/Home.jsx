import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// Custom Components
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import IndustryCard from '../components/IndustryCard';
import Button from '../components/Button';
import CTA from '../components/CTA';

// Data Arrays
import { industries } from '../data/industries';

const whyChooseUsData = [
  { 
    title: "Senior Leadership Expertise", 
    desc: "Our advisors carry senior leadership backgrounds in global consulting networks, delivering enterprise-level intelligence." 
  },
  { 
    title: "Practical & Compliant", 
    desc: "Every recommendation is grounded in what actually works and holds up in statutory audits." 
  },
  { 
    title: "Built to Scale", 
    desc: "Systems designed to grow with your business, from your first key hires to full enterprise operations." 
  }
];

const coreDisciplines = [
  {
    num: "01",
    title: "Talent Acquisition & Recruitment",
    desc: "Executive search, permanent & RPO hiring, and specialized onboarding — across white-collar and blue-collar roles, every function and level."
  },
  {
    num: "02",
    title: "HR Consulting & Advisory",
    desc: "Fractional HR Director support, organizational design, and policy & employee handbook creation."
  },
  {
    num: "03",
    title: "Payroll & Statutory Compliance",
    desc: "End-to-end payroll outsourcing plus PF, ESI, Bonus, Gratuity, Minimum Wages & Shop and Establishment compliance, filings, and labor code advisory."
  },
  {
    num: "04",
    title: "People, Development & HR Operations",
    desc: "Day-to-day HR operations, performance management, employee engagement, and complete HR outsourcing as your dedicated partner."
  }
];

const processSteps = [
  { 
    num: "1", 
    title: "Discovery & Audit", 
    desc: "We learn your business and assess where HR is working — and where it isn't." 
  },
  { 
    num: "2", 
    title: "Strategy Design", 
    desc: "We build a roadmap tailored to your size, industry, and goals." 
  },
  { 
    num: "3", 
    title: "Implementation", 
    desc: "We roll out systems, policies, and support with hands-on guidance." 
  },
  { 
    num: "4", 
    title: "Continuous Optimization", 
    desc: "We keep refining as you grow, so HR never becomes a bottleneck." 
  }
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
                title="Your Partner Behind Every Open Door"
              />
              <p className="text-gray-500 font-body text-base leading-relaxed">
                First Door HR Solutions is a premier corporate advisory delivering next-generation recruitment, talent acquisition, talent management, payroll & compliance, and organizational consulting. We help enterprise and high-growth businesses build resilient workforces built for scaling.
              </p>
              
              {/* Premium Brochure Quote Callout */}
              <div className="border-l-4 border-gold pl-6 py-3 bg-brandBgLight italic text-navy font-body text-sm font-semibold rounded-r-[4px]">
                "Enterprise-level intelligence, built by advisors who've led HR from the inside."
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 mb-6">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
            tagline="OUR SERVICES"
            title="Four Doors. One Partner."
            center
          />
          <p className="text-center text-gray-500 font-body text-sm max-w-xl mx-auto mb-12">
            A full-service HR consultancy built around four core disciplines — engage one, or all four.
          </p>

          {/* 4 Core Disciplines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {coreDisciplines.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-premium hover:border-gold/25 transition-all duration-300 flex items-start gap-6 group"
              >
                <span className="text-3xl font-body font-extrabold text-gold leading-none">
                  {item.num}
                </span>
                <div className="space-y-3">
                  <h3 className="font-headings font-bold text-xl text-navy group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button to="/services" variant="outline-gold">
              Explore All Portfolios
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section (How We Open Every Door) */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="OUR PROCESS"
            title="How We Open Every Door"
            center
          />
          <p className="text-center text-gray-500 font-body text-sm max-w-xl mx-auto mb-12">
            A clear, four-step path from first conversation to lasting change.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-12 mb-8">
            {/* Connecting line on desktop */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gray-200 hidden lg:block z-0" />

            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative z-10 text-center space-y-4 px-4"
              >
                {/* Step Circle */}
                <div className="w-14 h-14 rounded-full bg-navy text-gold border-4 border-white shadow-md flex items-center justify-center mx-auto text-lg font-bold">
                  {step.num}
                </div>
                {/* Title */}
                <h4 className="font-headings font-bold text-navy text-lg">{step.title}</h4>
                {/* Description */}
                <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center font-body text-xs md:text-sm text-gray-400 italic mt-6">
            Whether you need one project or an ongoing partner, we meet you at your door.
          </p>
        </div>
      </section>

      {/* Industries Preview Section */}
      <section className="py-24 bg-brandBgLight">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="INDUSTRIES & CLIENTS"
            title="Built for Where You're Headed"
            center
          />
          <p className="text-center text-gray-500 font-body text-sm max-w-xl mx-auto mb-12">
            We tailor every engagement to the realities of your industry and stage of growth.
          </p>

          {/* Show 6 brochure-aligned industries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {industries.map((industry, idx) => (
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
