import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'info@vermilionroutes.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';

const SMTP_HOST = process.env.SMTP_HOST || 'mail.vermilionroutes.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const generateVerificationToken = (email: string, cedula: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  return jwt.sign({ email, cedula }, secret, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  try {
    return jwt.verify(token, secret) as { email: string; cedula: string };
  } catch (error) {
    return null;
  }
};

export const sendVerificationEmail = async (toEmail: string, name: string, token: string) => {
  const verifyUrl = `http://localhost:3000/es/affiliates/verify?token=${token}`;
  
  // NOTE: En producción reemplazar localhost:3000 por el dominio real
  const prodUrl = `https://www.vermilionroutes.com/es/affiliates/verify?token=${token}`;
  const finalUrl = process.env.NODE_ENV === 'production' ? prodUrl : verifyUrl;

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #f59e0b; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #a1a1aa; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Ambassador Program</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #27272a; padding-bottom: 15px;">Bienvenido a la Élite, ${name}</h2>
      
      <p style="color: #d4d4d8; line-height: 1.6; font-family: sans-serif;">
        Hemos recibido tu postulación al programa de embajadores de <strong>Vermilion Routes</strong>. 
        Para garantizar la seguridad de nuestra red y de tus comisiones, necesitamos verificar tu dirección de correo electrónico.
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${finalUrl}" style="background-color: #f59e0b; color: #09090b; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block;">
          Verificar y Crear Contraseña
        </a>
      </div>
      
      <p style="color: #a1a1aa; font-size: 12px; font-family: sans-serif; text-align: center; border-top: 1px solid #27272a; padding-top: 20px;">
        Este enlace expirará en 24 horas por motivos de seguridad.<br>
        Si no solicitaste esta cuenta, ignora este correo.
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando envío de correo en la consola:');
      console.log(`\n\n=== SIMULACRO DE CORREO A ${toEmail} ===`);
      console.log(`URL DE VERIFICACIÓN: ${finalUrl}`);
      console.log(`=========================================\n\n`);
      return true; // Simular éxito en desarrollo si no hay password
    }

    await transporter.sendMail({
      from: `"Vermilion Ambassadors" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: 'Activa tu cuenta de Embajador | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de verificación:', error);
    throw error;
  }
};

export const generateNewsletterToken = (email: string, affiliateId: string | null) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  return jwt.sign({ email, affiliateId }, secret, { expiresIn: '48h' });
};

export const verifyNewsletterToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'vermilion_secret_key_2026';
  try {
    return jwt.verify(token, secret) as { email: string; affiliateId: string | null };
  } catch (error) {
    return null;
  }
};

export const sendNewsletterVerificationEmail = async (toEmail: string, token: string) => {
  const verifyUrl = `http://localhost:3000/es/verify-newsletter?token=${token}`;
  const prodUrl = `https://www.vermilionroutes.com/es/verify-newsletter?token=${token}`;
  const finalUrl = process.env.NODE_ENV === 'production' ? prodUrl : verifyUrl;

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #052e16; color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #064e3b;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #34d399; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #a7f3d0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Club Exclusivo de Viajes</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #064e3b; padding-bottom: 15px;">Estás a un paso de la Élite</h2>
      
      <p style="color: #d1fae5; line-height: 1.6; font-family: sans-serif;">
        Has solicitado unirte al <strong>Club Exclusivo de Viajes Vermilion</strong>. 
        Por favor, confirma tu correo para recibir alertas de migración de fauna, ofertas de cruceros de lujo y tu 10% de descuento.
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${finalUrl}" style="background-color: #059669; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block;">
          Confirmar mi Correo
        </a>
      </div>
      
      <p style="color: #6ee7b7; font-size: 12px; font-family: sans-serif; text-align: center; border-top: 1px solid #064e3b; padding-top: 20px;">
        Si no solicitaste unirte, puedes ignorar este correo.
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando correo Newsletter a ' + toEmail);
      console.log(`URL DE VERIFICACIÓN NEWSLETTER: ${finalUrl}`);
      return true; 
    }

    await transporter.sendMail({
      from: `"Club Vermilion" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: 'Confirma tu Suscripción | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de newsletter:', error);
    throw error;
  }
};

export const sendLeadMagnetEmail = async (toEmail: string, locale: string = 'es') => {
  const isEs = locale === 'es';
  const downloadUrl = 'https://www.vermilionroutes.com/guides/guia-ecuador-galapagos-2026.pdf';

  const htmlTemplate = `
    <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #042f2e; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #134e4a;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2dd4bf; font-size: 28px; font-weight: normal; margin: 0;">Vermilion Routes</h1>
        <p style="color: #99f6e4; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Luxury Expeditions & Custom Travel</p>
      </div>
      
      <h2 style="font-size: 22px; font-weight: normal; border-bottom: 1px solid #134e4a; padding-bottom: 15px; color: #ffffff;">
        ${isEs ? 'Tu Guía Exclusiva de Ecuador & Galápagos' : 'Your Exclusive Ecuador & Galapagos Guide'}
      </h2>
      
      <p style="color: #ccfbf1; line-height: 1.6; font-family: sans-serif; font-size: 15px;">
        ${isEs 
          ? 'Gracias por tu interés en descubrir los rincones más fascinantes y exclusivos de Ecuador Continental y las Islas Galápagos. Hemos preparado esta guía con recomendaciones de naturalistas locales, secretos de viaje y experiencias que no encontrarás en ningún otro lugar.'
          : 'Thank you for your interest in discovering the most fascinating and exclusive corners of Mainland Ecuador and the Galapagos Islands. We have prepared this guide curated by local naturalists with travel secrets and experiences found nowhere else.'}
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${downloadUrl}" target="_blank" style="background-color: #0d9488; color: #ffffff; padding: 15px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif; text-transform: uppercase; font-size: 14px; display: inline-block; box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4);">
          ${isEs ? '📥 Descargar Guía en PDF' : '📥 Download PDF Guide'}
        </a>
      </div>

      <div style="background-color: #115e59; padding: 20px; border-radius: 8px; margin-top: 30px; font-family: sans-serif; font-size: 13px; color: #e6fffa;">
        <p style="margin: 0; font-weight: bold; color: #ffffff;">${isEs ? '¿Planeando un viaje a medida?' : 'Planning a custom expedition?'}</p>
        <p style="margin: 5px 0 0 0; color: #ccfbf1;">
          ${isEs 
            ? 'Nuestro equipo de especialistas en expediciones está listo para diseñar tu itinerario privado perfecto. Contáctanos por WhatsApp al +593 99 404 8458.' 
            : 'Our expedition specialists are ready to craft your bespoke private itinerary. Contact us on WhatsApp at +593 99 404 8458.'}
        </p>
      </div>
      
      <p style="color: #5eead4; font-size: 11px; font-family: sans-serif; text-align: center; border-top: 1px solid #134e4a; padding-top: 20px; margin-top: 30px;">
        © 2026 Vermilion Routes. ${isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
      </p>
    </div>
  `;

  try {
    if (!SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD no configurado en .env - Simulando envío de Guía PDF a ' + toEmail);
      return true;
    }

    await transporter.sendMail({
      from: `"Vermilion Expeditions" <${SMTP_EMAIL}>`,
      to: toEmail,
      subject: isEs 
        ? '✨ Tu Guía Exclusiva de Viaje: Ecuador & Galápagos | Vermilion Routes' 
        : '✨ Your Exclusive Travel Guide: Ecuador & Galapagos | Vermilion Routes',
      html: htmlTemplate,
    });
    return true;
  } catch (error) {
    console.error('Error enviando correo de Guía Lead Magnet:', error);
    throw error;
  }
};

