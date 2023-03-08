import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { SortOption } from '@types';

const router = createRouter<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

router.get(async (req, res) => {
    try {
        const { sort, pageIndex, size } = req.query;
        const takeNumber = Number(size);
        const skipNumber = (Number(pageIndex) - 1) * takeNumber;
        let products: Product[] = [];
        switch (sort) {
            case SortOption.PriceAsc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    orderBy: {
                        price: 'asc'
                    }
                });
                break;
            case SortOption.PriceDesc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    orderBy: {
                        price: 'desc'
                    }
                });
                break;
            case SortOption.CreatedAtDesc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
                break;
            default:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
                break;
        }
        return res.status(200).json(products);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
