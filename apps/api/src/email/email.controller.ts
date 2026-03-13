import { emailService } from './email.service';
import { Request, Response } from 'express';
import { SimpleApiResponse } from '@repo/contracts/types/api/SimpleApiResponse.dto';
import { sendContactUsRequestSchema } from '@repo/contracts/schemas/email/sendContactUsRequest';
import { bookingRequestSchema } from '@repo/contracts/schemas/email/bookingRequest';

class EmailController {
  async sendContactEmail(req: Request, res: Response<SimpleApiResponse>) {
    const parsedPayload = sendContactUsRequestSchema.parse(req.body);
    await emailService.sendContactEmail(parsedPayload);
    res.status(200).json({ message: 'Email sent successfully' });
  }

  async sendBookingEmail(req: Request, res: Response<SimpleApiResponse>) {
    const parsedPayload = bookingRequestSchema.parse(req.body);
    await emailService.sendBookingEmail(parsedPayload);
    res.status(200).json({ message: 'Email sent successfully' });
  }
}

export const emailController = new EmailController();
