import { SendContactUsRequest } from '@repo/contracts/schemas/email/sendContactUsRequest';
import { BookingRequest } from '@repo/contracts/schemas/email/bookingRequest';

class EmailUtils {
  createContactUsHtml(payload: SendContactUsRequest) {
    const { email, name, inquirySubject, message } = payload;
    const html = `
        <h1>Contact Us</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${[inquirySubject]}</p>
        <p><strong>Message:</strong> ${message}</p>
        `;
    return html;
  }

  createBookingHtml(payload: BookingRequest) {
    const { email, firstName, lastName, phone, date, time, guests, atmosphere, notes } = payload;
    const html = `
        <h1>Booking Request</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Atmosphere:</strong> ${atmosphere}</p>
        <p><strong>Message:</strong> ${notes}</p>
        `;
    return html;
  }
}

export const emailUtils = new EmailUtils();
