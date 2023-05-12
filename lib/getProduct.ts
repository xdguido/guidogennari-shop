import { Category, Product } from '@prisma/client';
import { prisma } from './db';

export default async function getProduct(productSlug: string) {
    try {
        const product: Product & { category: Category } = await prisma.product.findUnique({
            where: { slug: productSlug },
            include: { category: true }
        });
        return product;
    } finally {
        await prisma.$disconnect();
    }
}
