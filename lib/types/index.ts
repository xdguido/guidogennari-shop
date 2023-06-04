import { Prisma } from '@prisma/client';

export enum SortOption {
    CreatedAtDesc = 'newest',
    PriceAsc = 'lowest-price',
    PriceDesc = 'highest-price'
}

export interface CartProduct {
    slug: string;
    name: string;
    price: number;
    quantity: number;
    imageSrc: string;
    imageAlt: string;
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
export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: { children: true };
}>;

export interface CategoryContextType {
    categories: CategoryWithChildren[];
}
