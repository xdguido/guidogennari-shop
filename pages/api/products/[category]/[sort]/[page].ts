import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import getProducts from '@lib/getProducts';
import { SortOption } from '@types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { sort, page, category } = req.query;
    const pageIndex = Number(page);

    const data = await getProducts(pageIndex, sort as SortOption, category as string);
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
