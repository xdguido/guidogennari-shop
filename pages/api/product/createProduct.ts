import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { errorHandler, noMatchHandler } from '@lib/api/errorHandler';
import { Product } from '@prisma/client';
import { prisma } from '@lib/db';
import slugify from '@lib/slugify';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
    const { body } = req;
    const productSlug = slugify(body.name);
    const product: Product = await prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock,
            thumbnail: body.thumbnail,
            media: body.media,
            slug: productSlug,
            categoryId: body.categoryId
        }
    });
    return res.status(201).json(product);
});

export default router.handler({
    onError: errorHandler,
    onNoMatch: noMatchHandler
});
