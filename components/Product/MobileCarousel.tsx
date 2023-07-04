import Image from 'next/image';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function MobileCarousel() {
    const images = [
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg'
    ];

    return (
        <>
            <div className="w-full carousel rounded-lg">
                {images.map((imageUrl) => {
                    return (
                        <div
                            key={imageUrl}
                            className={`carousel-item w-full aspect-w-1 aspect-h-1`}
                        >
                            <Image src={imageUrl} alt="alt" className="" fill />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center">
                <EllipsisHorizontalIcon aria-hidden="true" className="text-gray-400 w-10 h-10" />
            </div>
        </>
    );
}
