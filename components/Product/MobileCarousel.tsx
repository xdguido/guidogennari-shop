import React, { useReducer } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

type Motion = 'PREV' | 'NEXT' | 'TRACK' | 'BLOCK';

interface CarouselState {
    pos: number;
    px: number;
    isTracking: boolean;
}

type CarouselAction = { type?: Motion; numItems?: number; px?: number };

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
    const { pos } = state;
    const { numItems, px } = action;
    switch (action.type) {
        case 'PREV':
            return {
                ...state,
                pos: pos === 0 ? pos : pos - 1,
                isTracking: false
            };
        case 'NEXT':
            return {
                ...state,
                pos: pos === numItems - 1 ? pos : pos + 1,
                isTracking: false
            };
        case 'TRACK':
            const reducedMotion = px / 4;
            const isLastPosition = px < 0 && pos === numItems - 1;
            const isFirstPosition = px > 0 && pos === 0;

            return {
                ...state,
                px: isLastPosition || isFirstPosition ? reducedMotion : px,
                isTracking: true
            };
        case 'BLOCK':
            return {
                ...state,
                isTracking: false
            };
        default:
            return state;
    }
}

const getInitialState = (numItems: number): CarouselState => ({
    pos: numItems - 1,
    px: 0,
    isTracking: false
});

export default function MobileCarousel() {
    const images = [
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg'
    ];

    const numItems = images.length;
    const [state, dispatch] = useReducer(reducer, getInitialState(numItems));

    const slide = (dir: Motion) => {
        dispatch({ type: dir, numItems });
    };

    const track = (px: number) => {
        dispatch({ type: 'TRACK', px, numItems });
    };

    const preventSwipe = () => {
        dispatch({ type: 'BLOCK' });
    };

    const handlers = useSwipeable({
        onSwiping: (e) => {
            const { dir, deltaX, first } = e;
            const isUp = dir === 'Up' && first;
            const isDown = dir === 'Down' && first;
            if (isUp || isDown) {
                preventSwipe();
            } else {
                track(deltaX);
            }
        },
        onSwipedLeft: () => slide('NEXT'),
        onSwipedRight: () => slide('PREV'),
        trackTouch: true,
        trackMouse: true
    });

    return (
        <>
            <div {...handlers} className="flex w-full overflow-hidden aspect-w-1 aspect-h-1">
                <div
                    className={`flex ${
                        state.isTracking ? '' : 'transition-all duration-300 ease-in-out'
                    }`}
                    style={{
                        transform: state.isTracking
                            ? `translateX(-${state.pos * 100}%) translateX(${state.px}px)`
                            : `translateX(-${state.pos * 100}%)`
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="relative shrink-0 basis-full">
                            <Image src={image} alt={`Slide ${index}`} fill />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center p-3 gap-1">
                {Array.from({ length: images.length }).map((_, index) => {
                    return (
                        <span
                            key={index}
                            className={`h-1.5 w-1.5 rounded-full ${
                                state.pos === index ? 'bg-info' : 'bg-gray-400'
                            } `}
                        ></span>
                    );
                })}
            </div>
        </>
    );
}
