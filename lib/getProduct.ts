import { Product } from '@prisma/client';
import { prisma } from './db';

export default async function getProduct(productSlug: string) {
    try {
        const product: Product = await prisma.product.findUnique({ where: { slug: productSlug } });
        return product;
    } finally {
        await prisma.$disconnect();
    }
}
