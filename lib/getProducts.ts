import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getProducts(page: number) {
    try {
        const takeNumber = 12;
        const skipNumber = (Number(page) - 1) * takeNumber;
        const products: Product[] = await prisma.product.findMany({
            skip: skipNumber,
            take: takeNumber,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const total: number = await prisma.product.count();
        return { products, total };
    } finally {
        await prisma.$disconnect();
    }
}
