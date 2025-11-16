import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import SendGrid from "@sendgrid/mail";

import { config } from "../configs/config";

class SendGridService {
  constructor() {
    SendGrid.setApiKey(config.SENDGRID_API_KEY);
  }
  public async send(email: MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(email);
    } catch (error: any) {
      console.error("SendGrid error: ", error.response?.body || error);
    }
  }
}

export const sendGridService = new SendGridService();
