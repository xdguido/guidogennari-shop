import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ArrowsUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { SortOption } from '@lib/types';
import type { CategoryNode } from '@lib/types';
import Button from '@ui/Button';
import { useRouter } from 'next/router';

const sortLabels = {
    [SortOption.CreatedAtDesc]: 'Newest',
    [SortOption.PriceAsc]: 'Lowest price',
    [SortOption.PriceDesc]: 'Highest price'
};

function SortMenu({ sort, categoryNode }: { sort: SortOption; categoryNode: CategoryNode }) {
    return (
        <Menu as="div" className="relative text-left">
            <Menu.Button
                as={Button}
                className="btn-outline no-animation btn-sm flex-nowrap gap-2 whitespace-nowrap bg-base-100 font-normal normal-case"
            >
                <ArrowsUpDownIcon className=" h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Sort by</span>
                {sortLabels[sort]}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-20 w-44 origin-top-right translate-y-3 rounded-md border border-neutral bg-base-contrast">
                    <div className="flex flex-col py-3">
                        {Object.keys(SortOption).map((sortKey: string) => (
                            <Menu.Item key={sortKey}>
                                {({ active }) => (
                                    <Link
                                        href={`/products/${categoryNode.slug}/${SortOption[sortKey]}`}
                                        className={clsx(
                                            SortOption[sortKey] === sort
                                                ? 'font-semibold text-info'
                                                : 'text-base-content',
                                            active ? 'text-info' : '',
                                            'block px-6 py-2 text-left text-sm'
                                        )}
                                    >
                                        {sortLabels[SortOption[sortKey]]}
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default function ProductsLayout({
    children,
    sort,
    categoryNode,
    parentCategory,
    totalProducts
}: {
    children: React.ReactNode;
    sort: SortOption;
    categoryNode: CategoryNode;
    parentCategory: CategoryNode | null;
    totalProducts: number;
}) {
    const router = useRouter();

    let category: CategoryNode;
    parentCategory ? (category = parentCategory) : (category = categoryNode);
    return (
        <div>
            <div className="mx-auto max-w-[1600px] lg:p-2">
                <div className="flex items-end justify-between p-2">
                    <h1 className="text-4xl font-bold tracking-tight lg:p-2">
                        {categoryNode.name}
                    </h1>
                    <div className="flex gap-2 sm:gap-3">
                        <SortMenu sort={sort} categoryNode={categoryNode} />
                        {/* <MobileMenu sort={sort} categoryNode={categoryNode} /> */}
                    </div>
                </div>

                <section className="pb-12">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-2 gap-y-10 p-2 lg:grid-cols-7 xl:grid-cols-5 xl:gap-6">
                        {/* Filters */}

                        <div className="sticky top-[5rem] hidden self-start rounded-md border border-neutral bg-base-contrast px-6 py-4 lg:col-span-2 lg:block xl:col-span-1">
                            <div className="breadcrumbs mb-8 hidden max-w-[10rem] text-sm sm:max-w-none lg:block ">
                                <ul>
                                    <li>
                                        <Link
                                            href={`/products/all-products/newest`}
                                            className={`${
                                                !categoryNode.parent
                                                    ? 'pointer-events-none text-neutral'
                                                    : 'text-base-content'
                                            }`}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    {categoryNode.parent && (
                                        <li>
                                            <Link
                                                href={`/products/${category.slug}/newest`}
                                                className={`${
                                                    router.asPath.startsWith(
                                                        `/products/${category.slug}`
                                                    )
                                                        ? 'pointer-events-none text-neutral'
                                                        : 'text-base-content'
                                                }`}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    )}
                                    {categoryNode.children.length === 0 && (
                                        <li className="text-neutral">{categoryNode.name}</li>
                                    )}
                                </ul>
                            </div>

                            <h3 className="mx-3 mb-2 text-sm text-neutral">Categories</h3>

                            <ul role="list" className="mb-10">
                                {category.children.map((category) => (
                                    <li className="mb-1" key={category.name}>
                                        <Button
                                            href={`/products/${category.slug}/${sort}`}
                                            className={`no-animation btn-block btn-sm justify-start border-none bg-inherit text-left font-normal normal-case ${
                                                router.asPath.startsWith(
                                                    `/products/${category.slug}`
                                                )
                                                    ? 'pointer-events-none bg-neutral bg-opacity-20 text-info'
                                                    : 'text-base-content hover:bg-opacity-0 hover:text-info'
                                            }`}
                                        >
                                            {category.name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="mx-3 mb-2 text-sm text-neutral">
                                Filters <span className="text-xs font-normal">(Coming soon)</span>
                            </h3>
                            {/* {filters.map((section) => (
                                <Disclosure as="div" key={section.id} className="mb-1">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                as={Button}
                                                className="no-animation btn-block btn-sm flex justify-between border-none bg-inherit text-left font-normal normal-case text-base-content hover:text-primary-content"
                                            >
                                                <span>{section.name}</span>
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

                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div
                                                            key={option.value}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                defaultChecked={option.checked}
                                                                className="ml-3 h-4 w-4 cursor-pointer rounded border-neutral text-primary focus:ring-primary"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 text-sm "
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))} */}
                        </div>
                        {/* Product grid */}
                        <div className="lg:col-span-5 xl:col-span-4">{children}</div>
                    </div>
                </section>
            </div>
        </div>
    );
}
