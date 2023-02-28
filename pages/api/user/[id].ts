import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { ErrorCode, Exception } from '@lib/api/errorException';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';

const router = createRouter<NextApiRequest, NextApiResponse>();
const prisma = new PrismaClient();
router.get(async (req, res) => {
    try {
        const { query } = req;
        const userId = Number(query.id);
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            return res.status(200).json({ id: user.id, name: user.name });
        }
        throw new Exception(ErrorCode.NotFound);
    } finally {
        await prisma.$disconnect();
    }
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
