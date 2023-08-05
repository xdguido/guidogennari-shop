import type { CartProduct } from '@/types';
import type { Product } from '@prisma/client';
import Image from 'next/image';
import clsx from 'clsx';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCart } from '@lib/store/CartContext';
import Button from '@ui/Button';

interface Props extends CartProduct {
    subtotal?: number;
}

export default function ProductItem({ slug, quantity, subtotal }: Props) {
    const { data: product, error, isLoading } = useSwr<Product>(`/api/product/${slug}`, fetcher);
    const { removeProduct, updateProductQuantity } = useCart();
    if (error) {
        removeProduct(slug);
        return null;
    }
    if (isLoading) {
        return null;
    }
    if (!product) {
        removeProduct(slug);
        return null;
    }
    return (
        <li className="grid grid-cols-4 py-6">
            <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded bg-base-200">
                <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="5vw"
                    className="object-cover"
                />
            </div>

            <div className="grid-col-1 col-span-3 ml-4 grid gap-2">
                <h3 className=" text-sm font-medium leading-tight  ">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>

                <div className="flex gap-2">
                    <p className=" text-sm">$ {Number(product.price).toLocaleString('es')}</p>

                    <span className="flex gap-2 text-sm text-success ">
                        <CheckIcon className=" h-5 w-5" /> Stock available
                    </span>
                </div>

                <div className="flex flex-1 justify-between text-sm">
                    <div className="mr-2 flex items-center">
                        <Button
                            className={clsx(
                                'btn-outline btn-square btn-sm',
                                quantity == 1 ? 'btn-disabled' : ''
                            )}
                            onClick={() => updateProductQuantity(product.slug, quantity - 1)}
                        >
                            <MinusIcon className="h-5 w-5" />
                        </Button>
                        <span className="px-3 text-base font-semibold">{quantity}</span>
                        <Button
                            className={clsx(
                                'btn-outline btn-square btn-sm',
                                quantity == 5 ? 'btn-disabled' : ''
                            )}
                            onClick={() => updateProductQuantity(product.slug, quantity + 1)}
                        >
                            <PlusIcon className="h-5 w-5" />
                        </Button>
                    </div>

                    <Button
                        className="btn-ghost btn-sm normal-case no-underline"
                        onClick={() => removeProduct(product.slug)}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </li>
    );
}
