import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
    XMarkIcon,
    Bars3Icon,
    BuildingStorefrontIcon,
    QuestionMarkCircleIcon,
    GlobeAmericasIcon,
    Cog6ToothIcon,
    Squares2X2Icon,
    BellIcon
} from '@heroicons/react/24/outline';
import ThemeToggler from '@ui/ThemeToggler';
import Button from '@ui/Button';
import { FaInstagram } from 'react-icons/fa';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <Button
                className="btn-outline btn-square btn-sm lg:hidden"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
                    {/* <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-base-300 bg-opacity-70 transition-opacity" />
                    </Transition.Child> */}

                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto flex w-screen max-w-md  flex-col justify-between border border-neutral bg-base-contrast">
                                    <div>
                                        <div className="flex justify-end px-4 pt-5">
                                            <Button
                                                className="btn-ghost btn-square btn-sm"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </Button>
                                        </div>
                                        <div className="px-12 py-8 text-lg">
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link
                                                        href="/products/all-products/newest"
                                                        className="flex items-center gap-3 font-semibold"
                                                    >
                                                        <BuildingStorefrontIcon
                                                            aria-hidden="true"
                                                            className="h-6 w-6"
                                                        />
                                                        Products
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/products/all-products/newest"
                                                        className="pointer-events-none flex items-center gap-3 font-semibold text-neutral"
                                                    >
                                                        <GlobeAmericasIcon
                                                            aria-hidden="true"
                                                            className="h-6 w-6"
                                                        />
                                                        About us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/products/all-products/newest"
                                                        className="pointer-events-none flex items-center gap-3 font-semibold text-neutral"
                                                    >
                                                        <QuestionMarkCircleIcon
                                                            aria-hidden="true"
                                                            className="h-6 w-6"
                                                        />
                                                        Frequent questions
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/products/all-products/newest"
                                                        className="pointer-events-none flex items-center gap-3 font-semibold text-neutral"
                                                    >
                                                        <FaInstagram
                                                            aria-hidden="true"
                                                            className="h-6 w-6"
                                                        />
                                                        Instagram
                                                    </Link>
                                                </li>
                                            </ul>
                                            {session?.user.role === 'admin' ? (
                                                <>
                                                    <div className="divider"></div>
                                                    <ul className="space-y-3">
                                                        <span className="text-sm uppercase">
                                                            Account
                                                        </span>
                                                        <li>
                                                            <Link
                                                                href="/admin/products"
                                                                className="flex items-center gap-3 font-semibold"
                                                            >
                                                                <Squares2X2Icon
                                                                    aria-hidden="true"
                                                                    className="h-6 w-6"
                                                                />
                                                                Dashboard
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="/products/all-products/newest"
                                                                className="pointer-events-none flex items-center gap-3 font-semibold text-neutral"
                                                            >
                                                                <BellIcon
                                                                    aria-hidden="true"
                                                                    className="h-6 w-6"
                                                                />
                                                                Notifications
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                href="/products/all-products/newest"
                                                                className="pointer-events-none flex items-center gap-3 font-semibold text-neutral"
                                                            >
                                                                <Cog6ToothIcon
                                                                    aria-hidden="true"
                                                                    className="h-6 w-6"
                                                                />
                                                                Settings
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-12 py-8">
                                        {session ? (
                                            <Button
                                                onClick={() => {
                                                    signOut();
                                                }}
                                                className="btn-error btn-sm"
                                            >
                                                Sign out
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    signIn();
                                                }}
                                                className="btn-primary btn-sm"
                                            >
                                                Sign in
                                            </Button>
                                        )}
                                        <ThemeToggler />
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
