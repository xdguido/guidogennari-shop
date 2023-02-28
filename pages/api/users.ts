import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';

const router = createRouter<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();
router.get(async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
