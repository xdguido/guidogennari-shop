import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';

const router = createRouter<NextApiRequest, NextApiResponse>();
const prisma = new PrismaClient();
router.get(async (req, res) => {
    try {
        const productLength = await prisma.product.count();
        return res.status(200).json(productLength);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
