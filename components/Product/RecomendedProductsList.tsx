import Image from 'next/image';
import Link from 'next/link';
import { CameraIcon } from '@heroicons/react/24/outline';
import type { Product } from '@prisma/client';

type Props = {
    products: Product[];
    currentProduct: string;
};
export default function RecomendedProductsList({ products, currentProduct }: Props) {
    const filteredProducts = products.filter((product) => product.slug !== currentProduct);
    const lastProduct = products[6];
    return (
        <section id="recommended" className="my-12 px-2">
            <h3 className="mb-4 text-lg font-semibold">Recommended products</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-1 md:grid-cols-5 lg:gap-x-2">
                {filteredProducts.slice(0, 5).map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group rounded-md bg-base-100 hover:bg-base-contrast lg:border lg:border-neutral lg:bg-base-contrast"
                    >
                        <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md lg:m-2">
                            {product.thumbnail ? (
                                <Image
                                    src={product.thumbnail}
                                    alt={`${product.name} image`}
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 1200px) 40vw, 25vw"
                                />
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="sr-only">Product image placeholder</span>
                                    <CameraIcon
                                        className="h-8 w-8 group-hover:opacity-75"
                                        aria-hidden="true"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-2 sm:p-4">
                            <h3 className="text-sm font-medium sm:text-base">{product.name}</h3>
                            <p className="text-sm text-neutral">Short description</p>
                            <p className="sr-only">{product.description}</p>
                            <p className="mt-1 font-medium ">
                                $ {product.price.toLocaleString('es')}
                            </p>
                        </div>
                    </Link>
                ))}
                {lastProduct && (
                    <Link href={`/product/${lastProduct.slug}`} className="group block md:hidden">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-base-200">
                            {lastProduct.thumbnail ? (
                                <Image
                                    src={lastProduct.thumbnail}
                                    alt={`${lastProduct.name} image`}
                                    className="object-cover object-center group-hover:opacity-75"
                                    fill
                                />
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="sr-only">Product image placeholder</span>
                                    <CameraIcon
                                        className="h-8 w-8 group-hover:opacity-75"
                                        aria-hidden="true"
                                    />
                                </div>
                            )}
                        </div>
                        <h3 className="mt-2 text-sm ">{lastProduct.name}</h3>
                        <p className="sr-only">{lastProduct.description}</p>
                        <p className="mt-1 text-lg font-medium ">
                            $ {lastProduct.price.toLocaleString('es')}
                        </p>
                    </Link>
                )}
            </div>
        </section>
    );
}
