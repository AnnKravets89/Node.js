import nodemailer, { Transporter } from "nodemailer";

//import { HbsTransporter } from "nodemailer-express-handlebars";
import { config } from "../configs/config";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.SMTP_EMAIL,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  public async sendMail(to: string): Promise<void> {
    await this.transporter.sendMail({
      to,
      subject: "Test email",
      text: "This is a test email",
    });
  }
}

export const emailService = new EmailService();
