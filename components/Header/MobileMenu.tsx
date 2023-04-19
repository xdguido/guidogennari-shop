import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { navigation } from './navigation';
import { CategoryWithChildren } from '@lib/getProducts';
import ThemeToggler from '@ui/ThemeToggler';
import Button from '@ui/Button';

type Props = {
    categoryTree: CategoryWithChildren[];
};

export default function MobileMenu({ categoryTree }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button className="btn-ghost btn-square btn-sm lg:hidden" onClick={() => setOpen(true)}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
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

                    <div className="fixed inset-0 z-50 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-base-100 pb-12 shadow-xl">
                                <div className="flex justify-between px-4 pt-5 pb-2">
                                    <Button
                                        className="btn-ghost btn-square btn-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <ThemeToggler />
                                    </div>
                                </div>

                                {/* Links */}

                                <div className="mt-3">
                                    <div className="border-b border-neutral">
                                        <ul className="-mb-px flex space-x-8 px-4 pb-2">
                                            <li>
                                                <Link href="/products" className="font-semibold">
                                                    Products
                                                </Link>
                                            </li>
                                            {navigation.pages.map((page) => (
                                                <li key={page.name}>
                                                    <Link
                                                        href={page.href}
                                                        className="font-semibold"
                                                    >
                                                        {page.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="space-y-10 px-4 pt-10 pb-8">
                                            {categoryTree.map((section) => (
                                                <div key={section.name}>
                                                    <p
                                                        id={`${section.id}-heading-mobile`}
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
                                                            <li key={item.name} className="flex">
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
