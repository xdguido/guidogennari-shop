import { PrismaClient } from '@prisma/client';
import type { CategoryWithChildren } from './getProducts';

const prisma = new PrismaClient();

export default async function getCategories() {
    async function getCategoryTree(categorySlugs: string[]): Promise<CategoryWithChildren[]> {
        const childCategories: CategoryWithChildren[] = [];

        async function getChildCategories(slug: string): Promise<void> {
            const categoryNode = await prisma.category.findUnique({
                where: { slug },
                include: { children: true }
            });

            if (!categoryNode) {
                return;
            }

            childCategories.push(categoryNode);
        }

        for (const slug of categorySlugs) {
            await getChildCategories(slug);
        }

        return childCategories;
    }

    try {
        const categoryTree = await getCategoryTree(['furniture', 'outdoor-products']);
        return categoryTree;
    } finally {
        await prisma.$disconnect();
    }
}
