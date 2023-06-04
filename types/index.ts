import { CategoryWithChildren } from '@lib/getProducts';

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

export interface CategoryContextType {
    categories: CategoryWithChildren[];
}
