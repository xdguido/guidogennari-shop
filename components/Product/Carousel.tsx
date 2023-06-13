import { useState } from 'react';
import Image from 'next/image';

export default function Carousel() {
    const images = [
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg'
    ];

    // Define currentImage and setCurrentImage as state variables and functions
    const [currentImage, setCurrentImage] = useState(images[0]);

    return (
        <div className="sticky top-[6rem] self-start">
            <div className="">
                <div className=" aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-base-200">
                    <Image
                        src={currentImage}
                        alt="alt"
                        className="object-cover object-center"
                        fill
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 w-full py-2 gap-2">
                {images.map((imageUrl) => {
                    return (
                        <button
                            key={imageUrl}
                            className=" overflow-hidden aspect-w-1 aspect-h-1"
                            onClick={() => setCurrentImage(imageUrl)}
                        >
                            <Image
                                src={imageUrl}
                                alt="alt"
                                className="rounded-md object-cover object-center"
                                fill
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
