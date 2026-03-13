import { asyncHandler } from '@/core/async-handler';
import { Router } from 'express';

import { emailController } from './email.controller';

const router = Router();

router.post('/contact-us', asyncHandler(emailController.sendContactEmail));
router.post('/booking', asyncHandler(emailController.sendBookingEmail));

export const EmailRouter = router;
