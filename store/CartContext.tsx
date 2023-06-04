/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType, CartProduct } from '@lib/types';
import { toast } from 'sonner';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const defaultCart: CartContextType = {
    cart: [],
    addProduct: () => {},
    removeProduct: () => {},
    updateProductQuantity: () => {},
    clearCart: () => {}
};

export const CartContext = createContext(defaultCart);

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
    const [cart, setCart] = useState<CartProduct[]>([]);
    // Get the cart data from local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartDataString = localStorage.getItem('cartData');
            const cartData = JSON.parse(cartDataString) || [];
            setCart(cartData);
        }
    }, []);

    const addProduct = (product: CartProduct) => {
        const isProductAlreadyInCart = cart.some((item) => item.slug === product.slug);

        if (isProductAlreadyInCart) {
            return toast.custom((t) => (
                <div className=" flex  items-center bg-base-100 shadow-lg rounded-lg border border-primary px-6 py-4 ">
                    <div className=" flex-auto">
                        <div className="flex items-start">
                            <div className=" flex-1">
                                <p className=" w-56  text-sm font-medium ">Item already in cart</p>
                                {/* <p className="mt-1 text-sm text-neutral">
                                    some text
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <InformationCircleIcon className=" h-6 w-6" />
                </div>
            ));
        }
        const updatedCart = [...cart, product];
        setCart((prevCart) => [...prevCart, product]);
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
        toast.custom((t) => (
            <div className=" flex items-center bg-base-100 shadow-lg rounded-lg border border-primary px-6 py-4">
                <div className="flex-1 ">
                    <div className="flex items-start">
                        <div className="flex-1">
                            <p className=" w-56 text-sm font-medium ">Item added successfully</p>
                            {/* <p className="mt-1 text-sm text-neutral">
                                    some text
                                </p> */}
                        </div>
                    </div>
                </div>
                <CheckCircleIcon className="h-6 w-6" />
            </div>
        ));
    };

    const removeProduct = (productSlug: string) => {
        const updatedCart = cart.filter((item) => item.slug !== productSlug);
        setCart((prevCart) => prevCart.filter((item) => item.slug !== productSlug));
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
    };

    const updateProductQuantity = (productSlug: string, quantity: number) => {
        const updatedCart = cart.map((product) =>
            product.slug === productSlug ? { ...product, quantity } : product
        );
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.slug === productSlug ? { ...product, quantity } : product
            )
        );
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cartData');
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                removeProduct,
                updateProductQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
