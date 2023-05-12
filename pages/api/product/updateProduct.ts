import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { Product } from '@prisma/client';
import { prisma } from '@lib/db';
import slugify from '@lib/slugify';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json('Unauthenticated');
    }
    if (session.user.role !== 'admin') {
        return res.status(403).json('Unauthorized');
    }

    const { body } = req;
    const product: Product = await prisma.product.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name ? body.name : undefined,
            description: body.description ? body.description : undefined,
            price: body.price ? body.price : undefined,
            stock: body.stock
                ? {
                      increment: body.stock
                  }
                : undefined,
            thumbnail: body.thumbnail ? body.thumbnail : undefined,
            media: body.media ? body.media : undefined,
            slug: body.name ? slugify(body.name) : undefined
        }
    });
    return res.status(200).json(product);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
