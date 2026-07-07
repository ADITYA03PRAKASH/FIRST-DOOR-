import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, AlertTriangle, Calendar, ChevronRight, FileText, Lock, Globe } from 'lucide-react';
import FAQ from '../components/FAQ';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const blogPosts = [
  {
    tag: "Compliance",
    date: "June 28, 2026",
    title: "Navigating the 2026 Labor Code Reforms",
    desc: "A comprehensive review of the new statutory guidelines on working hours, social security benefits, and contract agreements.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
  },
  {
    tag: "Recruitment",
    date: "May 15, 2026",
    title: "Attracting Top 5% Talent in Tech",
    desc: "Discover the recruitment methodologies, incentive models, and appraisal layouts that scale-up companies use to secure C-suite hires.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
  },
  {
    tag: "Workforce",
    date: "April 10, 2026",
    title: "Structuring Agile Organization Designs",
    desc: "How modular hierarchies and clear reporting structures speed up productivity and prevent team burnout during expansions.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80"
  }
];



const Resources = () => {
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    if (!downloadEmail) return;

    setDownloading(true);

    // Simulate PDF generation
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);

      // Virtual PDF file trigger
      const element = document.createElement('a');
      element.setAttribute('href', 'data:application/pdf;base64,JVBERi0xLjQKJdPr6gogMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCjIgMCBvYmoKICA8PCAvVHlwZSAvUGFnZXMKICAgICAvS2lkcyBbIDMgMCBSIF0KICAgICAvQ291bnQgMQogID4+CmVuZG9iagozIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2UKICAgICAvUGFyZW50IDIgMCBSCiAgICAgL1Jlc291cmNlcyA8PAogICAgICAgL0ZvbnQgPDwKICAgICAgICAgL0YxIDQgMCBSCiAgICAgICA+PgogICAgID4+CiAgICAgL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQogICAgIC9Db250ZW50cyA1IDAgUgogID4+CmVuZG9iago0IDAgb2JqCiAgPDwgL1R5cGUgL0ZvbnQKICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAvQmFzZUZvbnQgL0hlbHZldGljYQogID4+CmVuZG9iagogIDw8IC9MZW5ndGggNDQgPj4Kc3RyZWFtCkJUIC9GMSAyNCBUZiA3MCA3MDAgVGQgKEZpcnN0IERvb3IgSFIgQ29ycG9yYXRlIFByb2ZpbGUpIFR6IEVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNzEgMDAwMDAgbiAKMDAwMDAwMDEzMCAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMTggMDAwMDAgbiAKdHJhaWxlcgogIDw8IC9TaXplIDYKICAgICAvUm9vdCAxIDAgUgogID4+CnN0YXJ0eHJlZgozODEKJSVFT0YK');
      element.setAttribute('download', 'First_Door_HR_Corporate_Profile.pdf');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Reset states
      setEmail('');
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>HR Resources, Case Studies & FAQ | First Door HR</title>
        <meta name="description" content="Read our corporate HR Blog. View case studies on org design and compliance audits. Access FAQ collapsible lists and download our profile presentation." />
        <link rel="canonical" href="https://www.firstdoorhr.com/resources" />
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
            <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">Knowledge Resources</h1>
            <nav className="flex text-xs font-body uppercase tracking-wider text-white/60">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2 text-gold">/</span>
              <span className="text-gold">Resources</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* HR Blog Section */}
      <section className="py-24 bg-white" id="blog">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="INSIGHTS"
            title="Our HR & Compliance Blog"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-premium hover:border-gold/25 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Blog Image */}
                <div className="h-52 overflow-hidden relative">
                  <span className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[3px] z-20">
                    {post.tag}
                  </span>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/5 z-10" />
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 mb-6">
                    <span className="text-gray-400 font-body text-xs flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gold" /> {post.date}
                    </span>
                    <h3 className="font-headings font-bold text-lg text-navy group-hover:text-gold transition-colors duration-300">
                      <a href="#blog-details">{post.title}</a>
                    </h3>
                    <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                      {post.desc}
                    </p>
                  </div>

                  <a 
                    href="#blog-details" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors duration-300"
                  >
                    Read Article 
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>



      {/* FAQs Section */}
      <section className="py-24 bg-white" id="faqs">
        <div className="container mx-auto px-6">
          <SectionTitle 
            tagline="COMMON INQUIRIES"
            title="Frequently Asked Questions"
            center
          />
          <FAQ />
        </div>
      </section>

      {/* Download Widget and Compliance Alerts */}
      <section className="py-24 bg-navy text-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Download Profile Form */}
            <div className="space-y-6">
              <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">CORPORATE CAPABILITY</span>
              <h2 className="text-white font-headings font-extrabold text-3xl md:text-4xl leading-tight">
                Download Company Profile
              </h2>
              <p className="text-gray-300 font-body text-sm leading-relaxed pr-4">
                Request our complete corporate capability presentation containing detailed case reviews, pricing cards, and team profiles.
              </p>

              <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-lg">
                <input 
                  type="email"
                  required
                  value={downloadEmail}
                  onChange={(e) => setDownloadEmail(e.target.value)}
                  placeholder="Business Email Address"
                  disabled={downloading || downloadSuccess}
                  className="flex-grow bg-white/5 border border-white/10 rounded-[4px] py-3.5 px-4 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:bg-white/8 transition-all duration-200 disabled:opacity-50"
                  aria-label="Corporate Email input"
                />
                
                <Button 
                  type="submit" 
                  variant="gold" 
                  disabled={downloading || downloadSuccess}
                  className="py-3.5 px-8 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {downloading ? (
                    "Preparing..."
                  ) : downloadSuccess ? (
                    "Downloaded!"
                  ) : (
                    <>
                      <FileDown className="h-4 w-4" /> Download Profile
                    </>
                  )}
                </Button>
              </form>

              <AnimatePresence>
                {downloadSuccess && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-gold font-body font-semibold mt-2"
                  >
                    Success! Corporate profile download started. Check your browser.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Compliance Alert Box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <AlertTriangle className="h-6 w-6 text-gold" />
                <h3 className="font-headings font-bold text-xl text-white">Compliance Alerts</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-gold pl-4 py-1">
                  <span className="bg-gold text-dark text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px]">Provident Fund</span>
                  <p className="text-gray-300 font-body text-xs leading-relaxed mt-2">
                    Quarterly statutory provident fund interest rate adjustments declared. Employers must update calculations by July 15.
                  </p>
                </div>
                <div className="border-l-4 border-white/20 pl-4 py-1">
                  <span className="bg-white/25 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px]">Remote Work Safety</span>
                  <p className="text-gray-300 font-body text-xs leading-relaxed mt-2">
                    New remote worker safety and data confidentiality rules introduced. handbooks must incorporate remote-network rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Privacy Details */}
      <section className="py-24 bg-white" id="privacy-terms">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-16">
            
            {/* Privacy Policy */}
            <div className="space-y-4" id="privacy">
              <div className="flex items-center gap-3 text-navy">
                <Lock className="h-5 w-5 text-gold" />
                <h3 className="font-headings font-bold text-xl">Privacy Policy</h3>
              </div>
              <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                At First Door HR Solutions, we take client data privacy very seriously. We secure all payroll registrations, employee credentials, and contract files in encrypted systems. We do not sell or lease candidate details to third parties. Any credentials submitted through our recruitment portal are exclusively used to evaluate job applications against active client mandates.
              </p>
              <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                We comply with the latest corporate data protection standards, running weekly network vulnerability scans and maintaining access protocols for our payroll databases.
              </p>
            </div>

            {/* Terms of Service */}
            <div className="space-y-4" id="terms">
              <div className="flex items-center gap-3 text-navy">
                <Globe className="h-5 w-5 text-gold" />
                <h3 className="font-headings font-bold text-xl">Terms & Conditions</h3>
              </div>
              <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                By utilizing the consulting portals or registering business parameters with First Door HR Solutions, you agree to our standard advisory terms. All recruitment mandates require official contract approvals prior to candidate introductions. Standard placement fees are calculated based on the candidate's first-year gross package.
              </p>
              <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
                Any custom handbooks, statutory audits, or organization charts produced by First Door HR Solutions are proprietary to the purchasing client, subject to full settlement of invoice files.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;

