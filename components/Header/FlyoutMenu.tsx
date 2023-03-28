import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { navigation } from './navigation';
import { CategoryWithChildren } from '@lib/getProducts';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

type Props = {
    categoryTree: CategoryWithChildren[];
};

export default function FlyoutMenu({ categoryTree }: Props) {
    return (
        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
                <Popover className="flex">
                    {({ open }) => (
                        <>
                            <div className="relative flex">
                                <Popover.Button
                                    className={classNames(
                                        open
                                            ? 'border-primary text-primary'
                                            : 'border-transparent ',
                                        'relative z-50 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
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
                                <Popover.Panel className="absolute z-50 inset-x-0 top-full text-sm ">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                        className="absolute inset-0 top-1/2 shadow"
                                        aria-hidden="true"
                                    />

                                    <div className="relative bg-base-100">
                                        <div className="mx-auto max-w-7xl px-8">
                                            <div className="grid grid-cols-4 gap-8 p-8 text-sm">
                                                {categoryTree.map((section) => (
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
                                                                    href={`/products/${section.slug}`}
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
                                                                        href={`/products/${item.slug}`}
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

                {navigation.pages.map((page) => (
                    <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium "
                    >
                        {page.name}
                    </a>
                ))}
            </div>
        </Popover.Group>
    );
}
