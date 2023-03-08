import Image from 'next/image';
import Link from 'next/link';
import { CameraIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import type { Product } from '@prisma/client';
import { fakeProducts } from './products';

type Props = {
    products: Product[];
    error: object;
    isLoading: boolean;
};
export default function ProductsList({ products, error, isLoading }: Props) {
    const displayProducts = products ? products : fakeProducts;
    if (error) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <div>loading</div>;
    }
    return (
        <>
            <div className="bg-base-100 mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:p-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {displayProducts.map((product) => (
                        <Link key={product.id} href="/" className="group">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-base-200 xl:aspect-w-7 xl:aspect-h-8">
                                {product.imageSrc ? (
                                    <Image
                                        src={product.imageSrc}
                                        alt="Product Image"
                                        className="object-cover object-center group-hover:opacity-75"
                                        fill
                                    />
                                ) : (
                                    <CameraIcon className="group-hover:opacity-75" />
                                )}
                            </div>
                            <h3 className="mt-4 text-sm ">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium ">{product.price}</p>
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
