import { SendContactUsRequest } from '@repo/contracts/schemas/email/sendContactUsRequest';
import { emailUtils } from './email.utils';
import { emailProvider } from './email.provider';
import ENV from '@/config/ENV';
import { BookingRequest } from '@repo/contracts/schemas/email/bookingRequest';

class EmailService {
  private readonly EMAIL_ADDRESSES = {
    noReply: 'no-reply@teresbahrain.com',
    sender: 'no-reply@teresbahrain.com',
    devRecipients: ['m.aziz.hlel@gmail.com'],
    prodRecipients: ['m.aziz.hlel@gmail.com'],
  };
  private readonly mailer = {
    contactUs: {
      from: this.EMAIL_ADDRESSES.noReply,
      to: ENV.NODE_ENV === 'production' ? this.EMAIL_ADDRESSES.prodRecipients : this.EMAIL_ADDRESSES.devRecipients,
    },
  };

  async sendContactEmail(payload: SendContactUsRequest) {
    const html = emailUtils.createContactUsHtml(payload);
    const mailSubject = `New Contact Us Request from ${payload.name}`;
    await emailProvider.sendEmail({
      from: this.mailer.contactUs.from,
      to: this.mailer.contactUs.to,
      subject: mailSubject,
      text: html,
    });
  }

  async sendBookingEmail(payload: BookingRequest) {
    const html = emailUtils.createBookingHtml(payload);
    const mailSubject = `New Booking Request from ${payload.firstName} ${payload.lastName}`;
    await emailProvider.sendEmail({
      from: this.mailer.contactUs.from,
      to: this.mailer.contactUs.to,
      subject: mailSubject,
      text: html,
    });
  }
}

export const emailService = new EmailService();
