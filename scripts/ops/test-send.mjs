import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config({ path: '.env' });

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const SMTP_HOST = process.env.SMTP_HOST || 'mail.vermilionroutes.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
  debug: true
});

async function testSend() {
  try {
    console.log('Sending test email to pablofgarciaf@gmail.com...');
    let info = await transporter.sendMail({
      from: `"Vermilion Test" <${SMTP_EMAIL}>`,
      to: 'pablofgarciaf@gmail.com',
      subject: 'Prueba de Sistema - Vermilion',
      text: 'Este es un correo de prueba generado desde la terminal de Next.js. Si recibes esto, el servidor SMTP funciona perfectamente.',
    });
    console.log('✅ Correo enviado con éxito!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Error enviando:', error);
  }
}

testSend();
