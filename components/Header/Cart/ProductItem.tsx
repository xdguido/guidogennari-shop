import Image from 'next/image';
import clsx from 'clsx';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCart } from '@lib/store/CartContext';
import Button from '@ui/Button';
import { CartProduct } from '@lib/types';

interface Props extends CartProduct {
    subtotal?: number;
}

export default function ProductItem({ slug, quantity, subtotal }: Props) {
    const { data: product, error, isLoading } = useSwr(`/api/product/${slug}`, fetcher);
    const { removeProduct, updateProductQuantity } = useCart();
    if (error) {
        removeProduct(slug);
        return null;
    }
    if (isLoading) {
        console.log('lol loading');
        return null;
    }
    if (!product) {
        console.log('no product');
        removeProduct(slug);
        return null;
    }
    return (
        <li className="grid grid-cols-4 py-6">
            <div>
                <div className=" overflow-hidden rounded bg-base-200">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover object-center"
                    />
                </div>
            </div>

            <div className="ml-4 col-span-3 grid grid-col-1 gap-2">
                <h3 className=" leading-tight text-sm font-medium  ">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>

                <div className="flex gap-2">
                    <p className=" text-sm">$ {Number(product.price).toLocaleString('es')}</p>

                    <span className="flex gap-2 text-sm text-success ">
                        <CheckIcon className=" h-5 w-5" /> Stock available
                    </span>
                </div>

                <div className="flex flex-1 justify-between text-sm">
                    <div className="flex items-center mr-2">
                        <Button
                            className={clsx(
                                'btn-outline btn-sm btn-square',
                                product.quantity == 1 ? 'btn-disabled' : ''
                            )}
                            onClick={() => updateProductQuantity(product.slug, quantity - 1)}
                        >
                            <MinusIcon className="h-5 w-5" />
                        </Button>
                        <span className="px-3 font-semibold text-base">{quantity}</span>
                        <Button
                            className={clsx(
                                'btn-outline btn-sm btn-square',
                                product.quantity == 5 ? 'btn-disabled' : ''
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
