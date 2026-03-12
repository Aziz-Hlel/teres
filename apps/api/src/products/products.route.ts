import { asyncHandler } from '@/core/async-handler';
import { Router } from 'express';

import { Request, Response } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/', asyncHandler(productController.create));

router.get('/', asyncHandler(productController.getPage));

router.get('/:id', asyncHandler(productController.getById));

router.put('/:id', asyncHandler(productController.update));

router.delete('/:id', asyncHandler(productController.delete));

export const productRouter = router;
