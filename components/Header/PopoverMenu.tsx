import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    BuildingStorefrontIcon,
    Cog6ToothIcon,
    GlobeAmericasIcon,
    QuestionMarkCircleIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';
import Button from '@ui/Button';
import Link from 'next/link';
import ThemeToggler from '@ui/ThemeToggler';
import { signIn, signOut, useSession } from 'next-auth/react';

import { FaInstagram } from 'react-icons/fa';

export default function PopoverMenu() {
    const { data: session } = useSession();
    const isAdmin = session?.user.role === 'admin';

    return (
        <Popover className="relative hidden lg:block">
            <Popover.Button
                as={Button}
                className="btn-outline btn-square btn-sm hidden lg:flex lg:btn-md"
            >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transform transition ease-out duration-175"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transform transition ease-out duration-175"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel className="absolute z-10 -translate-x-60 translate-y-3">
                    <div className="flex min-h-[450px] w-[290px] flex-col justify-between rounded-lg border border-neutral bg-base-contrast shadow-xl">
                        <div>
                            <div className="text-md px-10 py-8">
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
                                            <FaInstagram aria-hidden="true" className="h-6 w-6" />
                                            Instagram
                                        </Link>
                                    </li>
                                </ul>
                                {session ? (
                                    <>
                                        <div className="divider"></div>
                                        <ul className="space-y-3">
                                            <span className="text-sm uppercase">
                                                {isAdmin ? 'Administrator' : 'Account'}
                                            </span>
                                            {isAdmin && (
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
                                            )}
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
                        <div className="flex justify-between px-8 py-6">
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
                                    className="btn-primary btn-sm normal-case "
                                >
                                    Sign in
                                </Button>
                            )}
                            <ThemeToggler />
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
