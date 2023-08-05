import { Fragment, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import {
    XMarkIcon,
    AdjustmentsHorizontalIcon,
    MinusIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import type { CategoryNode } from '@/types';
import { SortOption } from '@/types';
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
                                        className="btn-ghost btn-square btn-sm -mr-2 text-base-content"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4 border-t border-base-200 p-4">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="mb-3 space-y-3 font-medium "
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        {categoryNode.children.length === 0 ? null : (
                                            <>
                                                <h3 className="mb-2 px-3 font-semibold text-neutral">
                                                    Categories
                                                </h3>
                                                {categoryNode.children.map((category) => (
                                                    <li key={category.name}>
                                                        <Button
                                                            href={`/products/${category.slug}/${sort}`}
                                                            className="btn-ghost no-animation btn-block btn-sm justify-start normal-case"
                                                        >
                                                            {category.name}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                    <h3 className="mb-2 px-3 font-semibold text-neutral">
                                        Filters
                                    </h3>
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className=" py-3">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="btn-ghost no-animation btn-block btn items-center justify-between text-sm  normal-case ">
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
                                                                            className="ml-3 h-4 w-4 cursor-pointer rounded border-neutral text-primary focus:ring-primary"
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
