import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for development
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// API route for booking
app.post('/api/book', async (req, res) => {
  const { name, email, phone, company, service, date, time, message } = req.body;

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

  try {
    // 2. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    await transporter.verify();

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

    // 4. Send Admin Email
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"First Door Booking" <noreply@firstdoorhr.com>',
      to: process.env.BOOKING_RECEIVER_EMAIL,
      subject: 'New Consultant Booking Request',
      html: adminHtml,
    });

    // 5. Customer Confirmation Email HTML Content
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
            <div class="greeting">Dear ${name},</div>
            <p class="thank-you">Thank you for booking a consultation with First Door HR Solutions. We have successfully received your request, and a senior representative will connect with you shortly to discuss your custom talent requirements.</p>
            
            <div class="summary-title">Your Booking Details</div>
            <ul class="detail-list">
              <li><strong>Service Selected:</strong> ${service}</li>
              <li><strong>Preferred Date:</strong> ${date}</li>
              <li><strong>Preferred Time:</strong> ${time}</li>
              <li><strong>Company:</strong> ${company || 'Not Provided'}</li>
            </ul>
            
            <div class="next-steps">
              <strong>What's Next?</strong><br>
              A consultant will review your challenges and touch base with you via phone or email within 24 business hours to lock in the final calendar invite.
            </div>

            <div class="contact-info">
              <strong>Have questions in the meantime?</strong><br>
              Email us at: <a href="mailto:letsconnect@firstdoorhr.com">letsconnect@firstdoorhr.com</a><br>
              Call us at: <a href="tel:+919911692679">+91 9911692679</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} First Door HR Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 6. Send Customer Confirmation Email
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"First Door HR Solutions" <noreply@firstdoorhr.com>',
      to: email,
      subject: "We've Received Your Consultation Request",
      html: customerHtml,
    });

    // 7. Success Return
    return res.status(200).json({ success: true, message: 'Consultation request submitted successfully. Emails sent.' });

  } catch (error) {
    // 8. Log error only on the server
    console.error('Error handling booking request:', error);
    return res.status(500).json({ error: 'Failed to process consultation request. SMTP transmission error.' });
  }
});

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Simple check route in dev
  app.get('/', (req, res) => {
    res.send('First Door HR Solutions API is running in development mode.');
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
