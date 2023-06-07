import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import getProducts from '@lib/api/getProducts';
import { SortOption } from '@lib/types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { sort, page, category } = req.query as {
        sort?: SortOption;
        page?: string;
        category?: string;
    };
    const pageIndex = Number(page);

    const data = await getProducts(pageIndex, sort, category);
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
