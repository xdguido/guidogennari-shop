import { prisma } from './db';
import { Prisma } from '@prisma/client';
import { SortOption } from '@types';

export type CategoryNode = Prisma.CategoryGetPayload<{
    include: { children: true; parent: true };
}>;
export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: { children: true };
}>;

async function getAllChildCategories(categorySlug: string): Promise<CategoryWithChildren[]> {
    const categoryNode = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: true }
    });

    if (!categoryNode) {
        return null;
    }

    const childCategories: CategoryWithChildren[] = [categoryNode];

    async function getChildCategories(node: CategoryWithChildren): Promise<void> {
        if (node.children.length > 0) {
            for (const child of node.children) {
                const childNode = await prisma.category.findUnique({
                    where: { slug: child.slug },
                    include: { children: true }
                });
                childCategories.push(childNode);
                await getChildCategories(childNode);
            }
        }
    }

    await getChildCategories(categoryNode);

    return childCategories;
}
export default async function getProducts(page: number, sort: SortOption, category: string) {
    try {
        const takeNumber = 12;
        const skipNumber = (Number(page) - 1) * takeNumber;

        const categoryTree: CategoryWithChildren[] = await getAllChildCategories(category);

        if (!categoryTree) {
            return null;
        }

        const products = await prisma.product.findMany({
            skip: skipNumber,
            take: takeNumber,
            where: {
                category: {
                    some: {
                        slug: { in: categoryTree.map((category) => category.slug) }
                    }
                }
            },
            orderBy: (() => {
                switch (sort) {
                    case SortOption.PriceAsc:
                        return {
                            price: 'asc'
                        };
                    case SortOption.PriceDesc:
                        return {
                            price: 'desc'
                        };
                    case SortOption.CreatedAtDesc:
                        return {
                            createdAt: 'desc'
                        };
                }
            })()
        });

        const total = await prisma.product.count({
            where: {
                category: {
                    some: {
                        slug: { in: categoryTree.map((category) => category.slug) }
                    }
                }
            }
        });
        const categoryNode: CategoryNode = await prisma.category.findUnique({
            where: { slug: category },
            include: { children: true, parent: true }
        });

        return { products, categoryNode, total };
    } finally {
        await prisma.$disconnect();
    }
}
