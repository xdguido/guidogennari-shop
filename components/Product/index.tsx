/* eslint-disable react/prop-types */
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { useRef } from 'react';
import Button from '@ui/Button';
import { ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

type Prop = { product: string };
export default function Index({ product }: Prop) {
    const { data } = useSwr<Product>(`/api/product/${product}`, fetcher);

    const carouselRef = useRef<HTMLDivElement>(null);

    const handleAnchorClick = (index: number) => {
        if (carouselRef.current) {
            const carouselItems = carouselRef.current.querySelectorAll('.carousel-item');
            carouselItems.forEach((item, i) => {
                if (i === index) {
                    item.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    };
    return (
        <div className="mx-auto max-w-6xl min-h-screen px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="w-full mx-auto">
                    <div className="carousel" ref={carouselRef}>
                        <div className="carousel-item aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-base-200">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                                alt="alt"
                                className="object-cover object-center"
                                fill
                            />
                        </div>
                        <div className="carousel-item aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-base-200">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
                                alt="alt"
                                className="object-cover object-center"
                                fill
                            />
                        </div>
                        <div className="carousel-item aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-base-200">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg"
                                alt="alt"
                                className="object-cover object-center"
                                fill
                            />
                        </div>
                        <div className="carousel-item aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-base-200">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                                alt="alt"
                                className="object-cover object-center"
                                fill
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 w-full py-2 gap-2">
                        <button
                            className=" overflow-hidden aspect-w-1 aspect-h-1"
                            onClick={() => handleAnchorClick(0)}
                        >
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                                alt="alt"
                                className="rounded-md object-cover object-center"
                                fill
                            />
                        </button>
                        <button
                            className=" overflow-hidden aspect-w-1 aspect-h-1"
                            onClick={() => handleAnchorClick(1)}
                        >
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
                                alt="alt"
                                className="rounded-md object-cover object-center"
                                fill
                            />
                        </button>
                        <button
                            className=" overflow-hidden aspect-w-1 aspect-h-1"
                            onClick={() => handleAnchorClick(2)}
                        >
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg"
                                alt="alt"
                                className="rounded-md object-cover object-center"
                                fill
                            />
                        </button>
                        <button
                            className=" overflow-hidden aspect-w-1 aspect-h-1"
                            onClick={() => handleAnchorClick(3)}
                        >
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                                alt="alt"
                                className="rounded-md object-cover object-center"
                                fill
                            />
                        </button>
                    </div>
                </div>
                <div className="px-6">
                    <h1 className="mb-2 text-2xl font-semibold tracking-tight leading-9">
                        {data.name}
                    </h1>
                    <div className="mb-4 flex items-center gap-4">
                        <p className="text-xl">$ {data.price}</p>
                        {/* <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input
                                type="radio"
                                name="rating-1"
                                className="mask mask-star"
                                checked
                                />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                                <input type="radio" name="rating-1" className="mask mask-star" />
                            </div> */}
                    </div>
                    <p className="mb-4 text-md">{data.description}</p>
                    <div className="md:grid grid-cols-2 gap-2">
                        <Button className="btn-primary btn-block mb-3">Buy now</Button>
                        <Button className="btn-outline btn-block mb-3">Add to cart</Button>
                    </div>
                    <Button className="btn-ghost gap-2">
                        <HeartIcon className="h-6 w-6" aria-hidden="true" /> Add to favourites
                    </Button>
                    <Button className="btn-ghost gap-2">
                        <ShareIcon className="h-6 w-6" aria-hidden="true" /> Share
                    </Button>
                    <div className="divider"></div>
                    <h3 className="mb-4 font-semibold">Details</h3>
                    <ul className="ml-6">
                        <li className="mb-2 list-disc">Some detail</li>
                        <li className="mb-2 list-disc">Another interesting detail</li>
                        <li className="mb-2 list-disc">More details, yeah</li>
                        <li className="mb-2 list-disc">Stop it</li>
                    </ul>
                    <div className="divider"></div>
                </div>
            </div>
        </div>
    );
}
