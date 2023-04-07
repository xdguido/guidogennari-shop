/* eslint-disable react/prop-types */
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Button from '@ui/Button';
import Link from 'next/link';
import { ShareIcon, HeartIcon } from '@heroicons/react/24/outline';
import Tabs from './Tabs';
import RecomendedProductsList from './RecomendedProductsList';
import Carousel from './Carousel';

type Prop = { productSlug: string; categorySlug: string };
export default function Index({ productSlug, categorySlug }: Prop) {
    const { data: product } = useSwr(`/api/product/${productSlug}`, fetcher);
    const {
        data: { products, categoryNode }
    } = useSwr(() => `/api/products/${categorySlug}/newest/1`, fetcher);

    return (
        <div className="mx-auto max-w-7xl min-h-screen px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="w-full">
                    <Carousel />
                    <div className="hidden md:block">
                        <Tabs />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 px-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-9">
                            {product.name}
                        </h1>
                        <div className="max-w-xs sm:max-w-none text-sm breadcrumbs">
                            <ul>
                                {categoryNode.parent && (
                                    <li>
                                        <Link href={`/products/${categoryNode.parent.slug}`}>
                                            {categoryNode.parent.name}
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link href={`/products/${categoryNode.slug}`}>
                                        {categoryNode.name}
                                    </Link>
                                </li>
                                <li>{product.name}</li>
                            </ul>
                        </div>
                    </div>
                    <span className="text-xl">$ {product.price.toLocaleString('es')}</span>
                    <p className=" text-md">{product.description}</p>

                    <div className="form-control">
                        <div className="input-group">
                            <select className="select select-bordered ">
                                <option selected>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <span>5 left</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button className="btn-primary btn-block">Buy now</Button>
                        <Button className="btn-outline btn-block">Add to cart</Button>
                    </div>

                    <div className="">
                        <Button className="btn-ghost gap-2">
                            <HeartIcon className="h-6 w-6" aria-hidden="true" /> Add to favourites
                        </Button>
                        <Button className="btn-ghost gap-2">
                            <ShareIcon className="h-6 w-6" aria-hidden="true" /> Share
                        </Button>
                    </div>

                    <div className="divider"></div>

                    <h3 className=" font-semibold">Details</h3>
                    <ul className="ml-5 mb-10">
                        <li className="mb-1 list-disc">
                            Material: Genuine Leather, Solid Wood Frame
                        </li>
                        <li className="mb-1 list-disc">Color Options: Black, Brown, Grey</li>
                        <li className="mb-1 list-disc">
                            Dimensions: 85{'"'} W x 34{'"'} D x 30{'"'} H
                        </li>
                        <li className="mb-1 list-disc">Assembly Required: Yes</li>
                        <li className="mb-1 list-disc">Warranty: 1 year</li>
                    </ul>
                    <h3 className=" font-semibold">Shipping</h3>
                    <ul className="ml-5 mb-10">
                        <li className="mb-1 list-disc">Shipping Method: Standard Shipping</li>
                        <li className="mb-1 list-disc">
                            Estimated Delivery Time: 5-7 Business Days
                        </li>
                        <li className="mb-1 list-disc">
                            Shipping Restrictions: This item can only be shipped within the United
                            States
                        </li>
                        <li className="mb-1 list-disc">
                            Shipping Confirmation: You will receive a shipping confirmation email
                            with a tracking number once your order has shipped.
                        </li>
                    </ul>
                    <h3 className=" font-semibold">Assembly</h3>
                    <ul className="ml-5">
                        <li className="mb-1 list-disc">Assembly Time: Approximately 30 minutes</li>
                        <li className="mb-1 list-disc">
                            Tools Required: Allen wrench (included), screwdriver (not included)
                        </li>
                        <li className="mb-1 list-disc">
                            Assembly Instructions: Detailed instructions are included in the
                            package.
                        </li>
                        <li className="mb-1 list-disc">
                            Assembly Video: A video tutorial is available on our website to assist
                            with assembly.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="md:hidden">
                <Tabs />
            </div>
            <div className="divider"></div>
            <RecomendedProductsList products={products} currentProduct={productSlug} />
        </div>
    );
}
