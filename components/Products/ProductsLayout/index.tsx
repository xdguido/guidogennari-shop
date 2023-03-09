import type { Product } from '@prisma/client';
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import useSwr, { preload } from 'swr';
import fetcher from '@lib/fetcher';

import { SortOption } from '@types';
import MobileMenu from './MobileMenu';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

import { sortOptions, subCategories, filters } from './filters';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductsLayout() {
    const [sort, setSort] = useState(SortOption.CreatedAtDesc);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [size, setSize] = useState(16);
    const {
        data: products,
        error,
        isLoading
    } = useSwr<Product[]>(
        `/api/products?sort=${sort}&pageIndex=${currentPageIndex}&size=${size}`,
        fetcher
    );
    const { data: productsLength } = useSwr(`/api/products/length`, fetcher);
    const maxPageIndex = Math.ceil(Number(productsLength) / size);
    function runPreload() {
        if (currentPageIndex < maxPageIndex) {
            preload(
                `/api/products?sort=${sort}&pageIndex=${currentPageIndex + 1}&size=${size}`,
                fetcher
            );
        }
    }
    useEffect(() => {
        setCurrentPageIndex(1);
    }, [sort]);

    return (
        <>
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-base-300 pt-10 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight ">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium ">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-base-content"
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-base-200 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="flex flex-col py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setSort(option.value)}
                                                            className={classNames(
                                                                option.value === sort
                                                                    ? 'font-medium'
                                                                    : 'text-base-content',
                                                                active ? 'bg-base-300' : '',
                                                                'block px-4 py-2 text-sm text-left'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2  sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>

                            {/* Mobile filter dialog */}
                            <MobileMenu />
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="space-y-4 border-b border-base-200 pb-6 text-sm font-medium "
                                >
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-base-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-base-100 py-3 text-sm ">
                                                        <span className="font-medium ">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map(
                                                            (option, optionIdx) => (
                                                                <div
                                                                    key={option.value}
                                                                    className="flex items-center"
                                                                >
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={
                                                                            option.checked
                                                                        }
                                                                        className="h-4 w-4 rounded border-base-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm "
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <PaginationButtons
                                    currentPageIndex={currentPageIndex}
                                    setCurrentPageIndex={setCurrentPageIndex}
                                    maxPageIndex={maxPageIndex}
                                    isTop
                                    runPreload={runPreload}
                                />
                                <ProductsList
                                    products={products}
                                    error={error}
                                    isLoading={isLoading}
                                />
                                <PaginationButtons
                                    currentPageIndex={currentPageIndex}
                                    setCurrentPageIndex={setCurrentPageIndex}
                                    maxPageIndex={maxPageIndex}
                                    runPreload={runPreload}
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
