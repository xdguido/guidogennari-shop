import { Prisma, Product } from '@prisma/client';

export enum SortOption {
    CreatedAtDesc = 'newest',
    PriceAsc = 'lowest-price',
    PriceDesc = 'highest-price'
}

export interface CartProduct {
    slug: string;
    quantity: number;
}

export interface CartContextType {
    cart: CartProduct[];
    addProduct: (product: CartProduct) => void;
    removeProduct: (productSlug: string) => void;
    updateProductQuantity: (productSlug: string, quantity: number) => void;
    clearCart: () => void;
}

export type CategoryNode = Prisma.CategoryGetPayload<{
    include: { children: true; parent: true };
}>;

export type ProductWithCategory = Prisma.ProductGetPayload<{ include: { category: true } }>;

export type GetFilteredTypes = {
    products: Product[];
    categoryNode: CategoryNode;
    count: number;
};

export interface CategoryContextType {
    categories: CategoryNode[];
}
