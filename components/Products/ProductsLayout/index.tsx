import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import { ArrowsUpDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import { SortOption } from '@types';
import type { CategoryNode } from '@lib/getProducts';
import MobileMenu from './MobileMenu';
import Button from '@ui/Button';
import { filters } from './filters';

type Props = {
    children: React.ReactNode;
    sort: SortOption;
    categoryNode: CategoryNode;
    totalProducts: number;
};

export default function ProductsLayout({ children, sort, categoryNode, totalProducts }: Props) {
    return (
        <>
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="lg:hidden text-4xl font-bold tracking-tight mb-2">
                        {categoryNode.name}
                    </h1>
                    <div className="flex justify-between items-end pb-2">
                        <h1 className="hidden lg:block text-4xl font-bold tracking-tight pl-3">
                            {categoryNode.name}
                        </h1>
                        <div className="lg:hidden max-w-[10rem] sm:max-w-none text-sm breadcrumbs">
                            <ul>
                                {categoryNode.parent && (
                                    <li>
                                        <Link href={`/products/${categoryNode.parent.slug}`}>
                                            {categoryNode.parent.name}
                                        </Link>
                                    </li>
                                )}
                                <li>{categoryNode.name}</li>
                            </ul>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                            <Menu as="div" className="relative text-left">
                                <div className=" text-sm">
                                    <Menu.Button
                                        as={Button}
                                        className="btn-ghost no-animation normal-case btn-sm gap-2 px-1 sm:px-2 font-normal"
                                    >
                                        <ArrowsUpDownIcon
                                            className=" h-3 w-3 text-base-content"
                                            aria-hidden="true"
                                        />
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
                                    <Menu.Items className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-base-100 shadow-2xl">
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

                            <MobileMenu sort={sort} categoryNode={categoryNode} />
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}

                            <div className="hidden lg:block sticky top-[4rem] self-start py-3">
                                <div className="block text-sm breadcrumbs pl-3">
                                    <ul>
                                        {categoryNode.parent && (
                                            <li>
                                                <Link
                                                    href={`/products/${categoryNode.parent.slug}`}
                                                >
                                                    {categoryNode.parent.name}
                                                </Link>
                                            </li>
                                        )}
                                        <li>{categoryNode.name}</li>
                                    </ul>
                                </div>
                                <p className="badge badge-outline ml-3 mb-3">
                                    {totalProducts + ' products'}
                                </p>
                                {categoryNode.children.length === 0 ? null : (
                                    <>
                                        <h3 className="text-base-content font-semibold mb-2 px-3">
                                            Categories
                                        </h3>
                                        <ul role="list" className="pb-6 text-sm">
                                            {categoryNode.children.map((category) => (
                                                <li key={category.name}>
                                                    <Button
                                                        href={`/products/${category.slug}/${sort}`}
                                                        className="btn-ghost btn-sm no-animation normal-case btn-block justify-start text-neutral hover:text-base-content font-normal"
                                                    >
                                                        {category.name}
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <h3 className="text-base-content font-semibold mb-2 px-3">
                                    Filters
                                </h3>
                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="py-4">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="btn btn-sm btn-ghost btn-block no-animation normal-case items-center justify-between text-sm text-neutral hover:text-base-content font-normal">
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
                                                                        className="h-4 w-4 rounded border-neutral text-primary focus:ring-primary cursor-pointer ml-3"
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
                            </div>
                            {/* Product grid */}
                            <div className="lg:col-span-3">{children}</div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
