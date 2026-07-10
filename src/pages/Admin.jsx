import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { UploadCloud, File, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const Admin = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeBrochure, setActiveBrochure] = useState({ url: '', filename: '' });
  const [fetchingMetadata, setFetchingMetadata] = useState(true);

  // Fetch currently active brochure details
  const fetchActiveBrochure = async () => {
    try {
      setFetchingMetadata(true);
      const res = await fetch('/api/brochure/url');
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setActiveBrochure(data);
        }
      }
    } catch (err) {
      console.error('Error fetching brochure metadata:', err);
    } finally {
      setFetchingMetadata(false);
    }
  };

  useEffect(() => {
    fetchActiveBrochure();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setErrorMsg('');
    setUploadSuccess(false);

    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMsg('Only PDF files are supported.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setErrorMsg('');
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('brochure', file);

    try {
      const res = await fetch('/api/admin/upload-brochure', {
        method: 'POST',
        body: formData,
      });

      let data = {};
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const errorText = await res.text();
        throw new Error(errorText || `Server returned status ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to upload brochure PDF.');
      }

      setUploadSuccess(true);
      setFile(null);
      
      // Refresh active brochure status
      await fetchActiveBrochure();

    } catch (err) {
      console.error('Error uploading file:', err);
      setErrorMsg(err.message || 'Server error. Failed to complete file upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Brochure Management | CMS Admin Portal | First Door HR</title>
        <meta name="robots" content="noindex, nofollow" />
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
            <h1 className="font-headings font-extrabold text-4xl md:text-5xl text-white mb-2">CMS Admin Portal</h1>
            <p className="text-xs font-body uppercase tracking-wider text-gold">Manage Corporate Presentation Files</p>
          </motion.div>
        </div>
      </section>

      {/* Admin Panel Main Container */}
      <section className="py-24 bg-brandBgLight">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Active Brochure Status (5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="font-headings font-bold text-navy text-xl border-b border-gray-100 pb-4 mb-6">Active Brochure</h3>
              
              {fetchingMetadata ? (
                <div className="flex items-center gap-2 text-gray-400 font-body text-sm py-4">
                  <RefreshCw className="h-4 w-4 animate-spin text-gold" /> Checking active brochure...
                </div>
              ) : activeBrochure.url ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gold/5 border border-gold/15 rounded-lg flex items-start gap-3">
                    <FileText className="h-10 w-10 text-gold flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-body font-bold text-xs uppercase tracking-wider text-gold">Currently Active</p>
                      <p className="font-body font-semibold text-sm text-navy truncate mt-1" title={activeBrochure.filename}>
                        {activeBrochure.filename}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href={activeBrochure.url} 
                      download={activeBrochure.filename}
                      className="inline-block w-full text-center bg-navy text-white hover:bg-navy-light text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-[4px] shadow transition-colors duration-200"
                    >
                      Download Current File
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-body font-bold text-sm text-navy">No Brochure Uploaded</p>
                  <p className="font-body text-xs text-gray-400 mt-1">Users will see a validation error on Resources page if they attempt to download.</p>
                </div>
              )}
            </div>

            {/* Right: Upload Interface (7 Columns) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
              <h3 className="font-headings font-bold text-navy text-xl border-b border-gray-100 pb-4">Upload New PDF Brochure</h3>
              
              {/* Feedback messages */}
              {errorMsg && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-[4px] text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              
              {uploadSuccess && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-[4px] text-xs font-semibold flex items-center gap-2 animate-pulse">
                  <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0" />
                  <span>Brochure replaced successfully! Live profile is updated.</span>
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                
                {/* Drag / File Input Wrapper */}
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 hover:border-gold/30 transition-colors duration-300 text-center bg-brandBgLight">
                  <input 
                    type="file" 
                    id="brochure-file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                  
                  <div className="space-y-3">
                    <UploadCloud className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="font-body font-bold text-sm text-navy">Choose brochure PDF file</p>
                      <p className="font-body text-xs text-gray-400 mt-1">Only PDF format is allowed. Max size: 20MB</p>
                    </div>
                  </div>
                </div>

                {/* Selected File Details */}
                {file && (
                  <div className="p-4 border border-gray-100 bg-brandBgLight rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <File className="h-8 w-8 text-navy flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-body font-semibold text-sm text-navy truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="font-body text-xs text-gray-400 mt-0.5">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Upload Action Button */}
                <Button 
                  type="submit" 
                  variant="gold"
                  disabled={!file || uploading}
                  className="w-full py-4 flex items-center justify-center gap-2 font-bold tracking-wider uppercase text-xs"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Uploading PDF File...
                    </>
                  ) : (
                    'Replace Corporate Brochure'
                  )}
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
