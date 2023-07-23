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
        <div className="sticky top-[6rem] grid grid-cols-12 gap-2 self-start">
            <div className="col-span-2 flex w-full flex-col gap-2">
                {images.map((imageUrl) => {
                    return (
                        <button
                            key={imageUrl}
                            className={`aspect-w-1 aspect-h-1 overflow-hidden`}
                            onMouseEnter={() => setCurrentImage(imageUrl)}
                            onClick={() => setCurrentImage(imageUrl)}
                        >
                            <Image
                                src={imageUrl}
                                alt="alt"
                                className={`rounded-md ${
                                    imageUrl === currentImage
                                        ? 'border-2 border-info'
                                        : 'border-2 border-neutral'
                                }`}
                                fill
                                sizes="5vw"
                            />
                        </button>
                    );
                })}
            </div>
            <div className="aspect-w-1 aspect-h-1 col-span-10 w-full overflow-hidden rounded-md bg-base-200">
                <Image
                    src={currentImage}
                    alt="alt"
                    className="object-cover"
                    fill
                    sizes="50vw"
                    priority={true}
                />
            </div>
        </div>
    );
}
