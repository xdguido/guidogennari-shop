import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { productControllers } from '@lib/api/controllers';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(productControllers.getFiltered);

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
