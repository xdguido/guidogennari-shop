import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, AdjustmentsHorizontalIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { CategoryNode } from '@lib/getProducts';
import { SortOption } from '@types';

type Props = { sort: SortOption; categoryNode: CategoryNode };
export default function MobileMenu({ sort, categoryNode }: Props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    return (
        <>
            <button
                type="button"
                className="-m-1 p-2 sm:ml-4 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">Filters</span>
                <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-base-300 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-base-100 py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium ">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-base-content"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4 border-t border-base-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="space-y-4 p-4 font-medium "
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <li>
                                            {categoryNode.parent ? (
                                                <Link
                                                    href={`/products/${categoryNode.parent.slug}/${sort}`}
                                                    className="flex items-center gap-2 font-normal"
                                                >
                                                    <ArrowLeftIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">go back to</span>{' '}
                                                    {categoryNode.parent.name}
                                                </Link>
                                            ) : null}
                                        </li>
                                        <li className="font-bold text-lg">
                                            <span className="sr-only">current category</span>
                                            {categoryNode.name}
                                        </li>
                                        {categoryNode.children.map((category) => (
                                            <li key={category.name}>
                                                <Link href={`/products/${category.slug}/${sort}`}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
