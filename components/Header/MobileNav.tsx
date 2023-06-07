import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { navigation } from './navigation';
import ThemeToggler from '@ui/ThemeToggler';
import Button from '@ui/Button';

export default function MobileMenu() {
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
                        <div className="fixed inset-0 bg-base-300 bg-opacity-70 transition-opacity" />
                    </Transition.Child>

                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed pointer-events-none inset-y-0 right-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto  w-screen max-w-md bg-base-100">
                                    <div className="flex justify-between px-4 pt-5 pb-2">
                                        <ThemeToggler />
                                        <Button
                                            className="btn-ghost btn-square btn-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </Button>
                                    </div>

                                    {/* Links */}

                                    <div className="mt-3">
                                        <div className="border-b border-neutral">
                                            <ul className="px-4 pb-2">
                                                <li>
                                                    <Link
                                                        href="/products"
                                                        className="font-semibold"
                                                    >
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
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
