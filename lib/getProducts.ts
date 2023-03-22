import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';
import { SortOption } from '@types';

const prisma = new PrismaClient();

export default async function getProducts(page: number, sort?: string) {
    try {
        const takeNumber = 12;
        const skipNumber = (Number(page) - 1) * takeNumber;
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
        const total: number = await prisma.product.count();
        return { products, total };
    } finally {
        await prisma.$disconnect();
    }
}
