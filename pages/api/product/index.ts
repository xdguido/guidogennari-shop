import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { productControllers } from '@lib/api/controllers';
import { authMiddleware } from '@lib/api/middleware';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(authMiddleware.validateAdmin, productControllers.create);
router.put(authMiddleware.validateAdmin, productControllers.edit);

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
