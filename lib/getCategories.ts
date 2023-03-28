import { prisma } from './db';
import type { CategoryWithChildren } from './getProducts';

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
async function getPrimaryCategories() {
    const globalCategory = await prisma.category.findFirst({
        where: { parentId: null },
        include: { children: true }
    });
    const categorySlugs = globalCategory.children.map((categoryNode) => {
        return categoryNode.slug;
    });
    return categorySlugs;
}
export default async function getCategories() {
    try {
        const primaryCategories = await getPrimaryCategories();
        const categoryTree = await getCategoryTree(primaryCategories);
        return categoryTree;
    } finally {
        await prisma.$disconnect();
    }
}
