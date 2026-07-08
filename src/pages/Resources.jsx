import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Lock, Globe, AlertCircle } from 'lucide-react';
import FAQ from '../components/FAQ';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const Resources = () => {
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [brochureInfo, setBrochureInfo] = useState({ url: '', filename: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch the active brochure url details from the backend
  useEffect(() => {
    const fetchBrochureDetails = async () => {
      try {
        const res = await fetch('/api/brochure/url');
        if (res.ok) {
          const data = await res.json();
          setBrochureInfo(data);
        }
      } catch (err) {
        console.error('Error fetching brochure URL:', err);
      }
    };
    fetchBrochureDetails();
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!downloadEmail) return;
    setErrorMsg('');
    setDownloadSuccess(false);

    // Verify if brochure has been uploaded
    if (!brochureInfo.url) {
      setErrorMsg('No company brochure has been uploaded by the admin yet.');
      return;
    }

    setDownloading(true);

    try {
      // Trigger native download using the URL from API
      const element = document.createElement('a');
      element.setAttribute('href', brochureInfo.url);
      element.setAttribute('download', brochureInfo.filename || 'First_Door_HR_Corporate_Profile.pdf');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloading(false);
      setDownloadSuccess(true);
      setDownloadEmail('');

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);

    } catch (err) {
      console.error('Failed to start download:', err);
      setErrorMsg('An error occurred while preparing the download. Please try again.');
      setDownloading(false);
    }
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

      {/* Download Widget */}
      <section className="py-24 bg-navy text-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="text-gold font-body font-bold text-xs uppercase tracking-[3px] mb-2 block">CORPORATE CAPABILITY</span>
            <h2 className="text-white font-headings font-extrabold text-3xl md:text-4xl leading-tight">
              Download Company Profile
            </h2>
            <p className="text-gray-300 font-body text-sm leading-relaxed max-w-lg mx-auto">
              Request our complete corporate capability presentation containing detailed case reviews, pricing cards, and team profiles.
            </p>

            <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
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
              {errorMsg && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 font-body font-semibold mt-2 flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="h-3.5 w-3.5" /> {errorMsg}
                </motion.p>
              )}
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
                By utilizing the consulting portals or registering business parameters with First Door HR Solutions, you agree to our standard advisory terms. All recruitment mandates require official contract approvals prior to candidate introductions. Standard placement fees are calculated based on the candidate's Cost to Company (CTC).
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

