import { asyncHandler } from '@/core/async-handler';
import { Router } from 'express';

import { eventsController } from './events.controller';

const router = Router();

router.post('/', asyncHandler(eventsController.create));

router.get('/', asyncHandler(eventsController.getPage));

router.get('/all', asyncHandler(eventsController.getAll));

router.get('/:id', asyncHandler(eventsController.getById));

router.put('/:id', asyncHandler(eventsController.update));

router.delete('/:id', asyncHandler(eventsController.delete));

export const eventsRouter = router;
