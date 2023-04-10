/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useRef } from 'react';

export default function Carousel() {
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
        <>
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
        </>
    );
}
