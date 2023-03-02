import Image from 'next/image';
import { products } from './products';

export default function ProductsList() {
    return (
        <>
            <div className="bg-base-100 rounded-md mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:p-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-base-100 xl:aspect-w-7 xl:aspect-h-8">
                                <Image
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover object-center group-hover:opacity-75"
                                    // height={80}
                                    // width={80}
                                    fill
                                />
                            </div>
                            <h3 className="mt-4 text-sm ">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium ">{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
