import { prisma } from './db';
import { Prisma } from '@prisma/client';
import { SortOption } from '@types';

export type CategoryNode = Prisma.CategoryGetPayload<{
    include: { children: true; parent: true };
}>;
export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: { children: true };
}>;

async function getAllChildCategories(
    categorySlug: string
): Promise<{ categoryTree: CategoryNode[]; categoryNode: CategoryNode } | null> {
    const categoryNode: CategoryNode = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: true, parent: true }
    });

    if (!categoryNode) {
        return null;
    }

    const categoryTree: CategoryNode[] = [categoryNode];

    async function getChildCategories(node: CategoryNode): Promise<void> {
        if (node.children.length > 0) {
            for (const child of node.children) {
                const childNode = await prisma.category.findUnique({
                    where: { slug: child.slug },
                    include: { children: true, parent: true }
                });
                categoryTree.push(childNode);
                await getChildCategories(childNode);
            }
        }
    }

    await getChildCategories(categoryNode);

    return { categoryTree, categoryNode };
}
export default async function getProducts(page: number, sort: SortOption, category: string) {
    try {
        const takeNumber = 12;
        const skipNumber = (Number(page) - 1) * takeNumber;

        const { categoryTree, categoryNode } = await getAllChildCategories(category);

        if (!categoryTree) {
            return null;
        }

        const products = await prisma.product.findMany({
            skip: skipNumber,
            take: takeNumber,
            where: {
                categoryId: { in: categoryTree.map((category) => category.id) }
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
                categoryId: { in: categoryTree.map((category) => category.id) }
            }
        });

        return { products, categoryNode, total };
    } finally {
        await prisma.$disconnect();
    }
}
