import { useState } from 'react';
import Image from 'next/image';

export default function Carousel() {
    const images = [
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg'
    ];

    // Define currentImage and setCurrentImage as state variables and functions
    const [currentImage, setCurrentImage] = useState(images[0]);

    return (
        <div className="sticky top-[6rem] mx-auto max-w-[500px] self-start xl:max-w-[600px]">
            <div className="aspect-w-1 aspect-h-1 mb-2 overflow-hidden  rounded-md bg-base-100 xl:mb-4">
                <Image
                    src={currentImage}
                    alt="alt"
                    className="object-cover"
                    fill
                    sizes="50vw"
                    priority={true}
                />
            </div>
            <div className="flex items-start justify-center gap-2 xl:gap-4">
                {images.map((imageUrl, index) => {
                    return (
                        <button
                            key={index}
                            className={`relative h-20 w-20 overflow-hidden rounded-md border-2 border-base-contrast xl:h-24 xl:w-24 ${
                                imageUrl === currentImage ? 'ring ring-info' : ''
                            }`}
                            onMouseEnter={() => setCurrentImage(imageUrl)}
                            onClick={() => setCurrentImage(imageUrl)}
                        >
                            <Image
                                src={imageUrl}
                                alt="alt"
                                sizes="5vw"
                                className="object-cover"
                                fill
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
