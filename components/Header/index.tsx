import Image from 'next/image';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu';
import FlyoutMenu from './FlyoutMenu';

export default function Header() {
    return (
        <header className="relative">
            <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm text-primary-content font-medium sm:px-6 lg:px-8">
                Get free delivery on orders over $100
            </p>

            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-base-200">
                    <div className="flex h-16 items-center">
                        {/* Mobile menu */}
                        <MobileMenu />

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="#">
                                <span className="sr-only">Your Company</span>
                                <Image
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                    width={100}
                                    height={100}
                                />
                            </a>
                        </div>

                        {/* Flyout menus */}
                        <FlyoutMenu />

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                    Sign in
                                </a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                    Create account
                                </a>
                            </div>

                            <div className="hidden lg:ml-8 lg:flex">
                                <a
                                    href="#"
                                    className="flex items-center text-gray-700 hover:text-gray-800"
                                >
                                    <Image
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="block h-auto w-5 flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </a>
                            </div>

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                        0
                                    </span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
