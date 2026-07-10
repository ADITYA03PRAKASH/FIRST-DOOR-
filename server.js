import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Local fallback directory logic moved inside the CloudStorageManager class to prevent startup crashes in read-only filesystems.

// Multer memory storage configuration (crucial for serverless environments)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Metadata config path is resolved dynamically in CloudStorageManager.

// Cloud Storage Manager definition
class CloudStorageManager {
  constructor() {
    this.useSupabase = !!(
      process.env.SUPABASE_URL && 
      process.env.SUPABASE_URL.startsWith('http') && 
      !process.env.SUPABASE_URL.includes('your_supabase_url') && 
      process.env.SUPABASE_ANON_KEY &&
      !process.env.SUPABASE_ANON_KEY.includes('your_supabase_anon_key')
    );
    this.useCloudinary = !!(
      process.env.CLOUDINARY_CLOUD_NAME && 
      !process.env.CLOUDINARY_CLOUD_NAME.includes('your_cloudinary') && 
      process.env.CLOUDINARY_API_KEY && 
      !process.env.CLOUDINARY_API_KEY.includes('your_cloudinary') &&
      process.env.CLOUDINARY_API_SECRET
    );

    if (this.useSupabase) {
      console.log('Active storage driver: Supabase Storage');
      this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
      this.bucketName = process.env.SUPABASE_BUCKET || 'brochures';
    } else if (this.useCloudinary) {
      console.log('Active storage driver: Cloudinary');
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
    } else {
      console.log('Active storage driver: Local File System (Development Only - will not persist on Netlify)');
    }
  }

  getUploadsDir() {
    return (process.env.VERCEL || process.env.NETLIFY)
      ? '/tmp/uploads'
      : path.resolve('uploads');
  }

  getMetadataPath() {
    return path.join(this.getUploadsDir(), 'metadata.json');
  }

  async uploadBrochure(fileBuffer, originalName) {
    if (this.useSupabase) {
      // 1. Upload brochure PDF to Supabase Storage
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload('brochure.pdf', fileBuffer, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (error) throw error;

      // 2. Upload metadata.json to Supabase Storage
      const metadata = {
        originalName,
        uploadDate: new Date().toISOString()
      };
      const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));

      const { error: metaError } = await this.supabase.storage
        .from(this.bucketName)
        .upload('metadata.json', metadataBuffer, {
          contentType: 'application/json',
          upsert: true
        });

      if (metaError) throw metaError;

      return {
        url: '/api/brochure/download',
        filename: originalName
      };

    } else if (this.useCloudinary) {
      // 1. Upload raw brochure PDF to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            public_id: 'first_door_brochure',
            overwrite: true,
            format: 'pdf'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });

      // 2. Upload metadata JSON as raw to Cloudinary
      const metadata = {
        originalName,
        uploadDate: new Date().toISOString(),
        url: uploadResult.secure_url
      };
      const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));

      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            public_id: 'first_door_brochure_metadata',
            overwrite: true,
            format: 'json'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(metadataBuffer);
      });

      return {
        url: '/api/brochure/download',
        filename: originalName
      };

    } else {
      // Fallback to local file system
      const uploadsDir = this.getUploadsDir();
      const metadataPath = this.getMetadataPath();
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filename = `${Date.now()}-${originalName}`;
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, fileBuffer);

      const metadata = {
        originalName,
        filename,
        filePath,
        uploadDate: new Date().toISOString()
      };
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

      return {
        url: '/api/brochure/download',
        filename: originalName
      };
    }
  }

  async getBrochureMetadata() {
    try {
      if (this.useSupabase) {
        const { data: urlData } = this.supabase.storage
          .from(this.bucketName)
          .getPublicUrl('metadata.json');

        const response = await fetch(urlData.publicUrl);
        if (!response.ok) {
          return null;
        }
        return await response.json();

      } else if (this.useCloudinary) {
        const publicUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/first_door_brochure_metadata.json`;
        const response = await fetch(publicUrl);
        if (!response.ok) {
          return null;
        }
        return await response.json();

      } else {
        const metadataPath = this.getMetadataPath();
        if (!fs.existsSync(metadataPath)) return null;
        return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      }
    } catch (e) {
      console.warn('Metadata not found or storage not accessible:', e.message);
      return null;
    }
  }

  async getBrochureFileStream() {
    if (this.useSupabase) {
      const { data: urlData } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl('brochure.pdf');

      const response = await fetch(urlData.publicUrl);
      if (!response.ok) return null;
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);

    } else if (this.useCloudinary) {
      const publicUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/first_door_brochure.pdf`;
      const response = await fetch(publicUrl);
      if (!response.ok) return null;
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);

    } else {
      const metadataPath = this.getMetadataPath();
      if (!fs.existsSync(metadataPath)) return null;
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      const filePath = path.resolve(metadata.filePath);
      if (!fs.existsSync(filePath)) return null;
      return fs.readFileSync(filePath);
    }
  }
}

const storageManager = new CloudStorageManager();

// Enable CORS for development and production domains (including Vercel previews)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://www.firstdoorhr.com',
  'https://firstdoorhr.com',
  'https://firstdoor-rho.vercel.app'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

if (process.env.ALLOWED_ORIGINS) {
  const parsedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean);
  allowedOrigins.push(...parsedOrigins);
}

// Normalize and clean allowed origins: trim, lowercase, remove trailing slash
const uniqueAllowedOrigins = Array.from(
  new Set(
    allowedOrigins.map(o => o.trim().toLowerCase().replace(/\/$/, ''))
  )
);

app.use(cors((req, callback) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const referer = req.headers.referer;

  console.log("CORS Verification - Origin:", origin);
  console.log("CORS Verification - Host:", host);
  console.log("CORS Verification - Referer:", referer);
  console.log("CORS Verification - Allowed Origins:", uniqueAllowedOrigins);

  // Allow requests with no origin (like mobile apps, curl, or same-origin)
  // Also allow 'null' origin which happens during browser cross-origin redirects
  if (!origin || origin === 'null') {
    callback(null, { origin: true });
    return;
  }

  const normalizedOrigin = origin.trim().toLowerCase().replace(/\/$/, '');
  console.log("CORS Verification - Normalized Origin:", normalizedOrigin);

  const isAllowed = uniqueAllowedOrigins.includes(normalizedOrigin) || normalizedOrigin.endsWith('.vercel.app');

  if (isAllowed) {
    callback(null, { origin: true });
  } else {
    console.error(`CORS Blocked: Origin "${origin}" is not allowed. Unique Allowed Origins:`, uniqueAllowedOrigins);
    // Attach error message to req object and allow CORS so the browser can read the JSON error
    req.corsError = `Not allowed by CORS: Origin "${origin}" is not in the allowed list.`;
    callback(null, { origin: true });
  }
}));

// Middleware to intercept CORS validation errors and return structured JSON
app.use((req, res, next) => {
  if (req.corsError) {
    return res.status(403).json({
      success: false,
      error: req.corsError
    });
  }
  next();
});

app.use(express.json());

// Helper function to create Nodemailer transporter and verify config
function createMailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error('SMTP Configuration Missing: host, user, or pass environment variable is undefined.');
    throw new Error('SMTP configuration missing on the server. Please check environment variables.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
}

// API route for booking
app.post('/api/book', async (req, res) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const referer = req.headers.referer;

  // Add complete runtime logging
  console.log("Booking Request - Origin:", origin);
  console.log("Booking Request - Host:", host);
  console.log("Booking Request - Referer:", referer);
  console.log("Booking Request - Request Body:", req.body);
  console.log("Booking Request - Allowed Origins:", uniqueAllowedOrigins);

  const normalizedOrigin = origin ? origin.trim().toLowerCase().replace(/\/$/, '') : 'None';
  console.log("Booking Request - Normalized Origin:", normalizedOrigin);

  // Verify all SMTP variables exist
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const bookingReceiver = process.env.BOOKING_RECEIVER_EMAIL;

  console.log("Verifying Environment Variables:");
  console.log("- SMTP_HOST exists:", !!smtpHost);
  console.log("- SMTP_PORT exists:", !!smtpPort);
  console.log("- SMTP_USER exists:", !!smtpUser);
  console.log("- SMTP_PASS exists:", !!smtpPass);
  console.log("- BOOKING_RECEIVER_EMAIL exists:", !!bookingReceiver);

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !bookingReceiver) {
    console.error("Missing environment variables: SMTP credentials or receiver email is undefined.");
    return res.status(500).json({
      success: false,
      error: "Missing environment variables"
    });
  }

  try {
    const { name, email, phone, company, service, date, time, message } = req.body || {};

    // 1. Validation
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields. Please provide name, email, phone, service, date, and time.' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address format.' });
    }

    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' (IST)';
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // 2. Configure Nodemailer Transporter
    const transporter = createMailTransporter();

    // Verify SMTP connection configuration
    try {
      await transporter.verify();
      console.log('SMTP verification result: Success');
    } catch (verifyError) {
      console.error('SMTP Connection Verification Failed in booking request:', verifyError);
      throw new Error(`SMTP connection verification failed: ${verifyError.message}`);
    }

    // 3. Admin Email HTML Content
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F9FB; margin: 0; padding: 20px; color: #1F2937; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 43, 91, 0.05); border-top: 5px solid #C6922E; }
          .header { background-color: #0F2B5B; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
          .content { padding: 40px 30px; }
          .section-title { font-size: 18px; font-weight: 700; color: #0F2B5B; margin-bottom: 20px; border-bottom: 2px solid #F8F9FB; padding-bottom: 10px; }
          .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .detail-table th { text-align: left; padding: 12px 10px; background-color: #F8F9FB; color: #0F2B5B; font-weight: 600; font-size: 14px; border-bottom: 1px solid #E5E7EB; width: 35%; }
          .detail-table td { padding: 12px 10px; color: #4B5563; font-size: 14px; border-bottom: 1px solid #E5E7EB; }
          .message-box { background-color: #F8F9FB; border-left: 4px solid #C6922E; padding: 15px; font-style: italic; color: #4B5563; font-size: 14px; line-height: 1.6; margin-top: 10px; }
          .footer { background-color: #081735; color: #9CA3AF; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>First Door HR Solutions</h1>
          </div>
          <div class="content">
            <div class="section-title">New Consultant Booking Request</div>
            <p>A new consultation request has been submitted. Details below:</p>
            <table class="detail-table">
              <tr><th>Full Name</th><td>${name}</td></tr>
              <tr><th>Email Address</th><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><th>Phone Number</th><td><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><th>Company Name</th><td>${company || 'Not Provided'}</td></tr>
              <tr><th>Service Selected</th><td><strong>${service}</strong></td></tr>
              <tr><th>Preferred Date</th><td>${date}</td></tr>
              <tr><th>Preferred Time</th><td>${time}</td></tr>
              <tr><th>Submission Time</th><td>${submissionDate}</td></tr>
              <tr><th>User IP Address</th><td>${userIp}</td></tr>
            </table>
            
            <div class="section-title">Message / Requirements</div>
            <div class="message-box">
              ${message ? message.replace(/\n/g, '<br>') : 'No requirements or challenges provided.'}
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Customer Confirmation Email HTML Content
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F9FB; margin: 0; padding: 20px; color: #1F2937; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 43, 91, 0.05); border-top: 5px solid #C6922E; }
          .header { background-color: #0F2B5B; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
          .content { padding: 40px 30px; line-height: 1.6; }
          .greeting { font-size: 18px; font-weight: bold; color: #0F2B5B; margin-bottom: 15px; }
          .thank-you { font-size: 15px; color: #4B5563; margin-bottom: 25px; }
          .summary-title { font-size: 16px; font-weight: 700; color: #0F2B5B; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; margin-bottom: 15px; }
          .detail-list { list-style-type: none; padding: 0; margin: 0 0 30px 0; }
          .detail-list li { padding: 8px 0; border-bottom: 1px dashed #F3F4F6; font-size: 14px; color: #4B5563; }
          .detail-list strong { color: #0F2B5B; display: inline-block; width: 150px; }
          .next-steps { background-color: #FBF7ED; border-left: 4px solid #C6922E; padding: 15px; color: #855C15; font-size: 14px; margin-bottom: 30px; border-radius: 0 4px 4px 0; }
          .contact-info { font-size: 14px; color: #4B5563; margin-top: 25px; border-top: 1px solid #E5E7EB; padding-top: 20px; }
          .contact-info a { color: #C6922E; text-decoration: none; font-weight: 600; }
          .footer { background-color: #081735; color: #9CA3AF; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>First Door HR Solutions</h1>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name},</div>
            <p class="thank-you">Thank you for booking a consultation with us.</p>
            <p class="thank-you">We have received your request successfully.</p>
            <p class="thank-you">Our team will review your requirements and contact you shortly.</p>
            <p class="thank-you">Thank you for choosing us.</p>
            
            <div class="summary-title">Your Booking Details</div>
            <table class="detail-table">
              <tr><th>Service Selected</th><td><strong>${service}</strong></td></tr>
              <tr><th>Preferred Date</th><td>${date}</td></tr>
              <tr><th>Preferred Time</th><td>${time}</td></tr>
              <tr><th>Company</th><td>${company || 'Not Provided'}</td></tr>
            </table>

            <p class="thank-you">Regards,<br>Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailFromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || '"First Door Booking" <noreply@firstdoorhr.com>';
    const customerMailFromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || '"First Door HR Solutions" <letsconnect@firstdoorhr.com>';

    // 5. Send both emails in parallel to optimize execution time in serverless environments
    await Promise.all([
      transporter.sendMail({
        from: mailFromAddress,
        to: process.env.BOOKING_RECEIVER_EMAIL,
        subject: 'New Consultant Booking Request',
        html: adminHtml,
      }),
      transporter.sendMail({
        from: customerMailFromAddress,
        to: email,
        subject: "Thank You for Booking a Consultation",
        html: customerHtml,
      })
    ]);

    console.log("Email sending result: Success");

    // 7. Success Return
    return res.status(200).json({ success: true, message: 'Consultation request submitted successfully. Emails sent.' });

  } catch (error) {
    // 8. Log error only on the server
    console.error('Error handling booking request:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to process consultation request. SMTP transmission error.', 
      details: error.message,
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
    });
  }
});

// Get active brochure URL & metadata
app.get('/api/brochure/url', async (req, res) => {
  try {
    const metadata = await storageManager.getBrochureMetadata();
    if (!metadata) {
      return res.status(200).json({ url: '', filename: '' });
    }
    return res.status(200).json({
      url: '/api/brochure/download',
      filename: metadata.originalName || 'First_Door_HR_Corporate_Profile.pdf'
    });
  } catch (error) {
    console.error('Error fetching brochure URL:', error);
    return res.status(500).json({ error: 'Server error fetching brochure metadata.' });
  }
});

// Download active brochure
app.get('/api/brochure/download', async (req, res) => {
  try {
    const metadata = await storageManager.getBrochureMetadata();
    if (!metadata) {
      return res.status(404).json({ error: 'No brochure has been uploaded yet.' });
    }

    const fileBuffer = await storageManager.getBrochureFileStream();
    if (!fileBuffer) {
      return res.status(404).json({ error: 'The brochure file could not be found on the storage server.' });
    }

    // Extract query parameters for email notification
    const { name, email, phone } = req.query;

    if (email) {
      const downloadTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' (IST)';
      const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

      // Configure Nodemailer Transporter
      const transporter = createMailTransporter();

      // Verify SMTP connection configuration
      try {
        await transporter.verify();
        console.log('SMTP connection verified successfully in brochure download.');
      } catch (verifyError) {
        console.error('SMTP Connection Verification Failed in brochure download:', verifyError);
        throw new Error(`SMTP connection verification failed: ${verifyError.message}`);
      }

      // 1. Visitor Thank-You Email HTML Content
      const visitorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F9FB; margin: 0; padding: 20px; color: #1F2937; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 43, 91, 0.05); border-top: 5px solid #C6922E; }
            .header { background-color: #0F2B5B; padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
            .content { padding: 40px 30px; line-height: 1.6; }
            .greeting { font-size: 18px; font-weight: bold; color: #0F2B5B; margin-bottom: 15px; }
            .thank-you { font-size: 15px; color: #4B5563; margin-bottom: 25px; }
            .footer { background-color: #081735; color: #9CA3AF; padding: 20px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>First Door HR Solutions</h1>
            </div>
            <div class="content">
              <div class="greeting">Hello ${name || 'Valued Visitor'},</div>
              <p class="thank-you">Thank you for downloading our brochure.</p>
              <p class="thank-you">We hope it helps you understand our solutions better.</p>
              <p class="thank-you">If you have any questions, feel free to contact us.</p>
              <p class="thank-you">Regards,<br>Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Admin Notification Email HTML Content
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F9FB; margin: 0; padding: 20px; color: #1F2937; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 43, 91, 0.05); border-top: 5px solid #C6922E; }
            .header { background-color: #0F2B5B; padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
            .content { padding: 40px 30px; }
            .section-title { font-size: 18px; font-weight: 700; color: #0F2B5B; margin-bottom: 20px; border-bottom: 2px solid #F8F9FB; padding-bottom: 10px; }
            .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .detail-table th { text-align: left; padding: 12px 10px; background-color: #F8F9FB; color: #0F2B5B; font-weight: 600; font-size: 14px; border-bottom: 1px solid #E5E7EB; width: 35%; }
            .detail-table td { padding: 12px 10px; color: #4B5563; font-size: 14px; border-bottom: 1px solid #E5E7EB; }
            .footer { background-color: #081735; color: #9CA3AF; padding: 20px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>First Door HR Solutions</h1>
            </div>
            <div class="content">
              <div class="section-title">New Brochure Download Notification</div>
              <p>A visitor has downloaded a brochure. Details below:</p>
              <table class="detail-table">
                <tr><th>Name</th><td>${name}</td></tr>
                <tr><th>Email Address</th><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><th>Phone Number</th><td><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><th>Brochure Name</th><td>${metadata.originalName || 'First_Door_HR_Corporate_Profile.pdf'}</td></tr>
                <tr><th>Feature/Page Name</th><td>Resources</td></tr>
                <tr><th>Download Time</th><td>${downloadTime}</td></tr>
                <tr><th>IP Address</th><td>${userIp}</td></tr>
              </table>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const visitorMailFromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || '"First Door HR Solutions" <letsconnect@firstdoorhr.com>';
      const alertMailFromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || '"First Door Brochure Alert" <letsconnect@firstdoorhr.com>';

      // Send both emails in parallel to optimize execution time in serverless environments
      await Promise.all([
        transporter.sendMail({
          from: visitorMailFromAddress,
          to: email,
          subject: 'Thank You for Downloading Our Brochure',
          html: visitorHtml,
        }),
        transporter.sendMail({
          from: alertMailFromAddress,
          to: process.env.BOOKING_RECEIVER_EMAIL,
          subject: 'New Brochure Download Notification',
          html: adminHtml,
        })
      ]);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${metadata.originalName || 'brochure.pdf'}"`);
    return res.send(fileBuffer);
  } catch (error) {
    console.error('Error downloading brochure:', error);
    return res.status(500).json({ error: error.message || 'Failed to download brochure file.' });
  }
});

// Admin upload brochure
app.post('/api/admin/upload-brochure', upload.single('brochure'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file was uploaded.' });
    }

    const result = await storageManager.uploadBrochure(req.file.buffer, req.file.originalname);

    return res.status(200).json({
      success: true,
      message: 'Brochure uploaded successfully to cloud persistent storage.',
      url: result.url,
      filename: result.filename
    });
  } catch (error) {
    console.error('Error uploading brochure:', error);
    return res.status(500).json({ error: error.message || 'Failed to upload brochure file.' });
  }
});

// Serve frontend build in production (disabled on serverless environments where static files are served directly from the CDN)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL && !process.env.NETLIFY) {
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.get('*any', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });
} else {
  // Simple check route in dev/serverless
  app.get('/', (req, res) => {
    res.send('First Door HR Solutions API is running.');
  });
}
// Global error handling middleware to ensure all server errors are returned as JSON instead of HTML
app.use((err, req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message,
    stack:
      process.env.NODE_ENV !== "production"
        ? err.stack
        : undefined
  });
});

export default app;

if (!process.env.VERCEL && !process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

