import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { SortOption } from '@types';
import getProducts from '@lib/getProducts';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { sort, page } = req.query;
    const pageIndex = Number(page);
    // const sortOption = Object.keys(SortOption).find((option) => option === sort);

    const data = await getProducts(pageIndex, sort);
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
