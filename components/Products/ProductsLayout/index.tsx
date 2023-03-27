import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { SortOption } from '@types';
import type { CategoryNode } from '@lib/getProducts';
import MobileMenu from './MobileMenu';

type Props = {
    children: React.ReactNode;
    sort: SortOption;
    categoryNode: CategoryNode;
};

export default function ProductsLayout({ children, sort, categoryNode }: Props) {
    return (
        <>
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between border-b border-base-300 pt-10 pb-6">
                        <div>
                            {categoryNode.parent ? (
                                <Link
                                    href={`/products/${categoryNode.parent.slug}/${sort}`}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                    <span className="sr-only">go back to</span>{' '}
                                    {categoryNode.parent.name}
                                </Link>
                            ) : null}
                            <h1 className="text-4xl font-bold tracking-tight ">
                                {categoryNode.name}
                            </h1>
                        </div>

                        <Menu as="div" className="relative inline-block text-left">
                            <div className="inline-flex justify-center text-sm">
                                <span className="hidden sm:block font-medium" aria-hidden="true">
                                    Sort by
                                </span>
                                <Menu.Button className="ml-2 group inline-flex justify-center items-center text-sm w-28">
                                    <span className="sr-only">Sort by</span>
                                    {(() => {
                                        switch (sort) {
                                            case SortOption.CreatedAtDesc:
                                                return 'Newest';
                                            case SortOption.PriceAsc:
                                                return 'Lower price';
                                            case SortOption.PriceDesc:
                                                return 'Higher price';
                                        }
                                    })()}
                                    <ChevronDownIcon
                                        className="ml-1 h-5 w-5 flex-shrink-0 text-base-content"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="flex flex-col py-1">
                                        {Object.keys(SortOption).map((sortKey: string) => (
                                            <Menu.Item key={sortKey}>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/products/${categoryNode.slug}/${SortOption[sortKey]}`}
                                                        className={clsx(
                                                            SortOption[sortKey] === sort
                                                                ? 'font-medium'
                                                                : 'text-base-content',
                                                            active ? 'bg-base-300' : '',
                                                            'block px-4 py-2 text-sm text-left'
                                                        )}
                                                    >
                                                        {(() => {
                                                            switch (SortOption[sortKey]) {
                                                                case SortOption.CreatedAtDesc:
                                                                    return 'Newest';
                                                                case SortOption.PriceAsc:
                                                                    return 'Lower price';
                                                                case SortOption.PriceDesc:
                                                                    return 'Higher price';
                                                                default:
                                                                    return SortOption[sortKey];
                                                            }
                                                        })()}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* <button type="button" className="-m-2 ml-5 p-2  sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button> */}

                        {/* Mobile filter dialog */}
                        <MobileMenu />
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Sub-Categories</h3>
                                <ul role="list" className="space-y-4 pb-6 text-sm font-medium ">
                                    {categoryNode.children.map((category) => (
                                        <li key={category.name}>
                                            <Link href={`/products/${category.slug}/${sort}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </form>
                            {/* Product grid */}
                            <div className="lg:col-span-3">{children}</div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
