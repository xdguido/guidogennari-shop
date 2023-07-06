import type { CategoryNode } from '@lib/types';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Button from '@ui/Button';

type Props = { categoryTree: CategoryNode[] };
export default function MobileMenu({ categoryTree }: Props) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const router = useRouter();
    const { category } = router.query;
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
                                    <Button
                                        className="-mr-2 btn-ghost btn-square btn-sm text-base-content"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                </div>

                                <div className="mt-4 p-4 border-t border-base-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul
                                        role="list"
                                        className="space-y-3 mb-3 font-medium "
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <h3 className="text-neutral font-semibold mb-2 px-3">
                                            Categories
                                        </h3>
                                        {categoryTree.map((section) => (
                                            <div key={section.name}>
                                                <p
                                                    id={`${section.name}-heading`}
                                                    className="ml-3 font-medium "
                                                >
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${section.name}-heading`}
                                                    className="mt-6 mb-6 space-y-2 sm:mt-4"
                                                >
                                                    <li className="flex">
                                                        <Button
                                                            href={`/admin/products/${section.slug}/newest/1`}
                                                            className={clsx(
                                                                'btn-ghost btn-sm no-animation normal-case btn-block justify-start hover:text-base-content',
                                                                category === section.slug
                                                                    ? 'pointer-events-none text-primary-content bg-primary-focus'
                                                                    : 'text-neutral'
                                                            )}
                                                        >
                                                            View all
                                                        </Button>
                                                    </li>
                                                    {section.children.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <Button
                                                                href={`/admin/products/${item.slug}/newest/1`}
                                                                className={clsx(
                                                                    'btn-ghost btn-sm no-animation normal-case btn-block justify-start hover:text-base-content',
                                                                    category === item.slug
                                                                        ? 'pointer-events-none text-primary-content  bg-primary-focus'
                                                                        : 'text-neutral'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
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
