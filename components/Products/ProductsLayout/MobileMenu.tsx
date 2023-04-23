import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import {
    XMarkIcon,
    AdjustmentsHorizontalIcon,
    ArrowLeftIcon,
    MinusIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import type { CategoryNode } from '@lib/getProducts';
import { SortOption } from '@types';
import Button from '@ui/Button';
import { filters } from './filters';

type Props = { sort: SortOption; categoryNode: CategoryNode };
export default function MobileMenu({ sort, categoryNode }: Props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    return (
        <>
            <Button
                className="btn-ghost btn-square btn-sm lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">Filters</span>
                <AdjustmentsHorizontalIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
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
                                    <h2 className="text-lg font-medium ">{categoryNode.name}</h2>
                                    <Button
                                        className="-mr-2 btn-ghost btn-square btn-sm text-base-content"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4 p-4 border-t border-base-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="space-y-3 mb-3 font-medium "
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        {categoryNode.children.length === 0 ? null : (
                                            <>
                                                <h3 className="text-neutral font-semibold mb-2 px-3">
                                                    Categories
                                                </h3>
                                                {categoryNode.children.map((category) => (
                                                    <li key={category.name}>
                                                        <Button
                                                            href={`/products/${category.slug}/${sort}`}
                                                            className="btn-ghost btn-sm no-animation normal-case btn-block justify-start"
                                                        >
                                                            {category.name}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                    <h3 className="text-neutral font-semibold mb-2 px-3">
                                        Filters
                                    </h3>
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className=" py-3">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="btn btn-ghost btn-block no-animation normal-case items-center justify-between  text-sm ">
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
                                                                            defaultValue={
                                                                                option.value
                                                                            }
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
