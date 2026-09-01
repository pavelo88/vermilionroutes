import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config({ path: '.env' });

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const SMTP_HOST = process.env.SMTP_HOST || 'mail.vermilionroutes.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);

console.log('Testing SMTP connection...');
console.log('Host:', SMTP_HOST);
console.log('Port:', SMTP_PORT);
console.log('User:', SMTP_EMAIL);
console.log('Password length:', SMTP_PASSWORD.length);
console.log('Password starts with:', SMTP_PASSWORD.substring(0, 2));
console.log('Password ends with:', SMTP_PASSWORD.substring(SMTP_PASSWORD.length - 2));

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
  debug: true,
  logger: true
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Connection error:', error);
  } else {
    console.log('✅ Server is ready to take our messages');
  }
});
