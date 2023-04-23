export enum SortOption {
    CreatedAtDesc = 'newest',
    PriceAsc = 'lower-price',
    PriceDesc = 'higher-price'
}

export interface CartProduct {
    slug: string;
    name: string;
    price: string;
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
