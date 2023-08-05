import { prisma } from '@lib/db';
import type { CategoryNode } from '@/types';

const getOne = async (categorySlug: string): Promise<CategoryNode> => {
    return await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: true, parent: true }
    });
};

const getRoot = async () => {
    return await prisma.category.findFirst({
        where: { parentId: null },
        include: { children: true }
    });
};

const categoryProvider = { getOne, getRoot };
export default categoryProvider;
