import Image from 'next/image';
import Link from 'next/link';
import { CameraIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import type { Product } from '@prisma/client';

type Props = {
    products: Product[];
};
export default function ProductsList({ products }: Props) {
    // if (products?.length == 0) {
    //     return (
    //         <div className="bg-base-100 mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:p-8">
    //             No products to display
    //         </div>
    //     );
    // }
    // if (!products) {
    //     return (
    //         <>
    //             <div className="bg-base-100 mx-auto max-w-2xl py-4 sm:py-6 lg:max-w-7xl lg:py-8 animate-pulse">
    //                 <h2 className="sr-only">Loading</h2>
    //                 <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
    //                     {Array.from({ length: 6 }).map((_, index) => (
    //                         <div key={index} className="group">
    //                             <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-base-200 xl:aspect-w-7 xl:aspect-h-8">
    //                                 <div className="flex items-center justify-center">
    //                                     {/* <CameraIcon className="h-11 w-11 group-hover:opacity-75" /> */}
    //                                 </div>
    //                             </div>
    //                             <div className="mt-4 rounded bg-base-200 h-[20px]"></div>
    //                             <div className="mt-1 rounded bg-base-200 h-[28px]"></div>
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }
    return (
        <>
            <div className="mx-auto pb-4 sm:pb-6 lg:pb-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-2 gap-y-1 gap-x-1 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group bg-base-100 rounded hover:shadow-xl hover:z-10 transition-shadow duration-500"
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-base-200 xl:aspect-w-7 xl:aspect-h-8 group-hover:rounded-b-none">
                                {product.thumbnail ? (
                                    <Image
                                        src={product.thumbnail}
                                        alt={`${product.name} image`}
                                        className="object-cover object-center"
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
                            <div className="p-2 sm:p-4">
                                <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
                                <p className="text-sm text-neutral">Short description</p>
                                <p className="sr-only">{product.description}</p>
                                <p className="mt-1 font-medium ">
                                    $ {product.price.toLocaleString('es')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

ProductsList.propTypes = {
    products: PropTypes.array,
    error: PropTypes.object,
    isLoading: PropTypes.bool
};
