import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';
import { SortOption } from '@types';

const prisma = new PrismaClient();

export default async function getProducts(page: number, sort: any, category: any) {
    try {
        const takeNumber = 12;
        const skipNumber = (Number(page) - 1) * takeNumber;

        let products: Product[] = [];
        let total = 0;

        switch (sort) {
            case SortOption.PriceAsc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    ...(category === 'all'
                        ? {}
                        : { where: { category: { some: { slug: category } } } }),
                    orderBy: {
                        price: 'asc'
                    }
                });
                break;
            case SortOption.PriceDesc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    ...(category === 'all'
                        ? {}
                        : { where: { category: { some: { slug: category } } } }),
                    orderBy: {
                        price: 'desc'
                    }
                });
                break;
            case SortOption.CreatedAtDesc:
                products = await prisma.product.findMany({
                    skip: skipNumber,
                    take: takeNumber,
                    ...(category === 'all'
                        ? {}
                        : { where: { category: { some: { slug: category } } } }),
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
                break;
            default:
                products = null;
                break;
        }

        switch (category) {
            case 'all':
                total = await prisma.product.count();
                break;
            default:
                total = await prisma.product.count({
                    where: { category: { some: { slug: category } } }
                });
                break;
        }
        return { products, total };
    } finally {
        await prisma.$disconnect();
    }
}
