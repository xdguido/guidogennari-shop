import { Fragment } from 'react';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { useCategory } from '~/lib/store/CategoryContext';

export default function FlyoutMenu() {
    const { categories } = useCategory();
    return (
        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
                <Popover className="flex">
                    {({ open }) => (
                        <>
                            <div className="relative flex">
                                <Popover.Button
                                    className={`
                                    relative z-50 -mb-px flex items-center border-b-2 pt-px text-sm font-medium uppercase transition-colors duration-200 ease-out
                                        ${
                                            open
                                                ? 'border-primary text-primary'
                                                : 'border-transparent '
                                        }
                                        `}
                                >
                                    Products
                                </Popover.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Popover.Panel className="absolute inset-x-0 top-full z-50 border-b border-b-neutral text-sm">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                        className="absolute inset-0 top-1/2 shadow"
                                        aria-hidden="true"
                                    />
                                    <div className="relative bg-base-100">
                                        <div className="mx-auto max-w-7xl px-8">
                                            <div className="grid grid-cols-4 gap-8 p-8 text-sm">
                                                {categories.map((section) => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${section.name}-heading`}
                                                            className="font-medium "
                                                        >
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${section.name}-heading`}
                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                        >
                                                            <li className="flex">
                                                                <Link
                                                                    href={`/products/${section.slug}/newest`}
                                                                    className=""
                                                                >
                                                                    View all
                                                                </Link>
                                                            </li>
                                                            {section.children.map((item) => (
                                                                <li
                                                                    key={item.name}
                                                                    className="flex"
                                                                >
                                                                    <Link
                                                                        href={`/products/${item.slug}/newest`}
                                                                        className=""
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                <a
                    href="#"
                    className="pointer-events-none flex items-center text-sm font-medium uppercase text-neutral"
                >
                    About
                </a>

                <a
                    href="#"
                    className="pointer-events-none flex items-center text-sm font-medium uppercase text-neutral"
                >
                    Help
                </a>

                {/* {navigation.pages.map((page) => (
                    <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium "
                    >
                        {page.name}
                    </a>
                ))} */}
            </div>
        </Popover.Group>
    );
}
