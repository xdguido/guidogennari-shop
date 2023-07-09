import React, { useReducer } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

type Direction = 'PREV' | 'NEXT';

interface CarouselState {
    pos: number;
    dir: Direction;
}

type CarouselAction = { type: Direction; numItems: number };

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
    switch (action.type) {
        case 'PREV':
            return {
                ...state,
                dir: 'PREV',
                pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1
            };
        case 'NEXT':
            return {
                ...state,
                dir: 'NEXT',
                pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1
            };
        default:
            return state;
    }
}

const getInitialState = (numItems: number): CarouselState => ({
    pos: numItems - 1,
    dir: 'NEXT'
});

export default function MobileCarousel() {
    const images = [
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg'
    ];

    const numItems = images.length;
    const [state, dispatch] = useReducer(reducer, getInitialState(numItems));

    const slide = (dir: Direction) => {
        dispatch({ type: dir, numItems });
    };

    const handlers = useSwipeable({
        onSwiping: (e) => console.log(e),
        onSwipedLeft: () => slide('NEXT'),
        onSwipedRight: () => slide('PREV'),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <>
            <div
                {...handlers}
                className="flex w-full overflow-hidden rounded-lg aspect-w-1 aspect-h-1"
            >
                <div
                    className={`flex transition-all duration-350`}
                    style={{ transform: `translateX(-${state.pos * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="relative shrink-0 basis-full">
                            <Image
                                // key={index}
                                src={image}
                                alt={`Slide ${index}`}
                                fill
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <EllipsisHorizontalIcon aria-hidden="true" className="text-gray-400 w-10 h-10" />
            </div>
        </>
    );
}
