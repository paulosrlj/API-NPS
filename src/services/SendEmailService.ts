import nodemailer, { Transporter } from 'nodemailer';

import SMTP_CONFIG from '../config/mail';

class SendEmailServices {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      auth: {
        user: SMTP_CONFIG.auth.user,
        pass: SMTP_CONFIG.auth.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.client = transporter;
  }
}

export default new SendEmailServices();
