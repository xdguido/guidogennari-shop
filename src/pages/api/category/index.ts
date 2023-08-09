import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '~/lib/api/errorHandler';
import { categoryControllers } from '~/lib/api/controllers';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(categoryControllers.getTree);

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
