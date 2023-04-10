import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import getProduct from '@lib/getProduct';
import { Product } from '@prisma/client';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { product } = req.query;
    const data: Product = await getProduct(product as string);
    return res.status(200).json(data);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
