import type { Category, Product } from '@prisma/client';
import { prisma } from '@lib/db';
import slugify from '@lib/slugify';
import { CategoryNode, SortOption } from '@lib/types';

const getFiltered = async (
    skipNumber: number,
    takeNumber: number,
    sort: SortOption,
    cateoryBranch: CategoryNode[]
) => {
    try {
        const products = await prisma.product.findMany({
            skip: skipNumber,
            take: takeNumber,
            where: {
                categoryId: { in: cateoryBranch.map((category) => category.id) }
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
        return products;
    } finally {
        await prisma.$disconnect();
    }
};

/**

Retrieves a single product based on its slug.
@param {string} productSlug - The slug of the product.
@returns {Promise<Product & { category: Category }>} - A promise that resolves to the product with its associated category.
*/
const getOne = async (productSlug: string): Promise<Product & { category: Category }> => {
    try {
        const product: Product & { category: Category } = await prisma.product.findUnique({
            where: { slug: productSlug },
            include: { category: true }
        });
        return product;
    } finally {
        await prisma.$disconnect();
    }
};

const getCount = async (categoryBranch: CategoryNode[]) => {
    try {
        const count = await prisma.product.count({
            where: {
                categoryId: { in: categoryBranch.map((category) => category.id) }
            }
        });
        return count;
    } finally {
        await prisma.$disconnect();
    }
};

const create = async (productData: Product) => {
    try {
        const productSlug = slugify(productData.name);
        const product: Product = await prisma.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                thumbnail: productData.thumbnail,
                media: productData.media,
                slug: productSlug,
                categoryId: productData.categoryId
            }
        });
        return product;
    } finally {
        await prisma.$disconnect();
    }
};

const edit = async (productData: Product) => {
    try {
        const product: Product = await prisma.product.update({
            where: {
                id: productData.id
            },
            data: {
                name: productData.name ? productData.name : undefined,
                description: productData.description ? productData.description : undefined,
                price: productData.price ? productData.price : undefined,
                stock: productData.stock
                    ? {
                          increment: productData.stock
                      }
                    : undefined,
                thumbnail: productData.thumbnail ? productData.thumbnail : undefined,
                media: productData.media ? productData.media : undefined,
                slug: productData.name ? slugify(productData.name) : undefined
            }
        });
        return product;
    } finally {
        await prisma.$disconnect();
    }
};

const productsProviders = { getFiltered, getOne, getCount, create, edit };
export default productsProviders;
