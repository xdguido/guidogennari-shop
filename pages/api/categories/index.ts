import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import getCategories from '@lib/api/getCategories';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const data = await getCategories();
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
