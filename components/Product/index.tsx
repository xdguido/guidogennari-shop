/* eslint-disable react/prop-types */
import type { CartProduct, GetFilteredTypes, ProductWithCategory } from '@/types';
import { useState } from 'react';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Button from '@ui/Button';
import Link from 'next/link';
import { InformationCircleIcon, CheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import { NextSeo } from 'next-seo';
import { useCart } from '@lib/store/CartContext';
// import Tabs from './Tabs';
import RecomendedProductsList from './RecomendedProductsList';
import Carousel from './Carousel';
import MobileCarousel from './MobileCarousel';

type Prop = { productSlug: string; recommendedProducts: GetFilteredTypes };
export default function Index({ productSlug, recommendedProducts }: Prop) {
    const [qty, setQty] = useState(1); // Initialize qty state with default value of 1
    const { addProduct } = useCart();

    const { data: product } = useSwr<ProductWithCategory>(`/api/product/${productSlug}`, fetcher);
    const { products, categoryNode } = recommendedProducts;

    function handleQtyChange(event) {
        setQty(parseInt(event.target.value)); // Update qty state with the selected value
    }

    const cartData: CartProduct = {
        slug: productSlug,
        quantity: qty
    };

    return (
        <>
            <NextSeo
                title={`${product.name} | E-commerce`}
                description={`${product.description}`}
                openGraph={{
                    type: 'website',
                    url: `https://nextjs-prisma-ecommerce.vercel.app/product/${product.slug}`,
                    title: `${product.name} | E-commerce`,
                    description: product.description,
                    images: [
                        {
                            url: product.thumbnail,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt'
                        }
                    ]
                }}
            />
            <div className="mx-auto min-h-screen max-w-[1600px] lg:px-4">
                <div className="breadcrumbs hidden text-sm lg:block">
                    <ul>
                        {categoryNode.parent && (
                            <li>
                                <Link href={`/products/${categoryNode.parent.slug}/newest`}>
                                    {categoryNode.parent.name}
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href={`/products/${categoryNode.slug}/newest`}>
                                {categoryNode.name}
                            </Link>
                        </li>
                        <li>{product.name}</li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:rounded-lg lg:border lg:border-neutral lg:bg-base-contrast lg:p-8 xl:grid-cols-3 xl:gap-8 xl:p-16">
                    <div className="breadcrumbs px-2 text-sm lg:hidden">
                        <ul>
                            {categoryNode.parent && (
                                <li>
                                    <Link href={`/products/${categoryNode.parent.slug}/newest`}>
                                        {categoryNode.parent.name}
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href={`/products/${categoryNode.slug}/newest`}>
                                    {categoryNode.name}
                                </Link>
                            </li>
                            <li>{product.name}</li>
                        </ul>
                    </div>
                    <div className="hidden w-full lg:col-span-2 lg:block ">
                        <Carousel />
                    </div>
                    <div className="lg:hidden">
                        <MobileCarousel />
                    </div>
                    <div className="grid grid-cols-1 gap-4 px-4 lg:px-0 xl:pr-8">
                        <div>
                            <h1 className="text-2xl font-semibold leading-9 tracking-tight sm:text-3xl">
                                {product.name}
                            </h1>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">
                                    $ {product.price.toLocaleString('es')}
                                </span>
                                <div
                                    className="tooltip tooltip-info before:w-[12rem] before:content-[attr(data-tip)]"
                                    data-tip="Special price paying with cash or bank deposit"
                                >
                                    <InformationCircleIcon className="h-5 w-5 text-info" />
                                </div>
                            </div>
                            <span className="text-sm text-info">See all payment methods</span>
                        </div>
                        <p className="">{product.description}</p>

                        <div className="form-control">
                            <div className="input-group">
                                <span className="bg-base-100">
                                    <label htmlFor="qty-select">Quantity:</label>
                                </span>
                                <select
                                    className="select-bordered select border-base-100"
                                    id="qty-select"
                                    value={qty}
                                    onChange={handleQtyChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex gap-2 text-sm text-success">
                                <CheckIcon className=" h-5 w-5" /> Stock available
                            </span>
                            <span className="flex gap-2 text-sm text-success">
                                <TruckIcon className=" h-5 w-5" /> Shipping to Argentina
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <Button className="btn-primary btn-block">Buy now</Button>
                            <Button
                                className="btn-outline btn-block"
                                onClick={() => {
                                    addProduct(cartData);
                                }}
                            >
                                Add to cart
                            </Button>
                        </div>

                        {/* <div className="">
                                <Button className="btn-ghost gap-2 mr-2">
                                    <HeartIcon className="h-6 w-6" aria-hidden="true" /> Add to
                                    favourites
                                </Button>
                                <Button className="btn-ghost gap-2">
                                    <ShareIcon className="h-6 w-6" aria-hidden="true" /> Share
                                </Button>
                            </div> */}

                        <div className="divider"></div>

                        <h3 className=" font-semibold">Details</h3>
                        <ul className="ml-5 text-sm">
                            <li className="mb-1 list-disc">
                                Material: Genuine Leather, Solid Wood Frame
                            </li>
                            <li className="mb-1 list-disc">Assembly Required: Yes</li>
                            <li className="mb-1 list-disc">
                                Assembly Time: Approximately 30 minutes
                            </li>
                            <li className="mb-1 list-disc">Warranty: 1 year</li>
                        </ul>

                        <h3 className="font-semibold">Dimensions</h3>
                        <div className="overflow-x-auto">
                            <table className="table w-full rounded-lg bg-base-100 text-sm">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="bg-base-100 normal-case">Part</th>
                                        <th className="bg-base-100 normal-case">Height</th>
                                        <th className="bg-base-100 normal-case">Width</th>
                                        <th className="bg-base-100 normal-case">Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>Main desk</th>
                                        <td>83 cm</td>
                                        <td>100 cm</td>
                                        <td>50 cm</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>Secondary desk</th>
                                        <td>83 cm</td>
                                        <td>100 cm</td>
                                        <td>50 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <Tabs /> */}
                    </div>
                </div>
                <div className="divider"></div>
                <RecomendedProductsList products={products} currentProduct={productSlug} />
            </div>
        </>
    );
}
