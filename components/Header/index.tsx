import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import MobileMenu from './MobileMenu';
import FlyoutMenu from './FlyoutMenu';
import Logo from '@ui/Logo';
import ThemeToggler from '@ui/ThemeToggler';
import { CategoryWithChildren } from '@lib/getProducts';

type Props = { categoryTree: CategoryWithChildren[] };

export default function Header({ categoryTree }: Props) {
    const [top, setTop] = useState(true);
    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);
    return (
        <header
            className={clsx(
                'fixed  w-full z-30 bg-base-100 transition duration-150 ease-in-out motion-reduce:transition-none',
                top ? '' : 'shadow-md'
            )}
        >
            <p
                className={clsx(
                    'h-10 text-center items-center justify-center bg-primary px-4 text-sm text-primary-content font-medium sm:px-6 lg:px-8',
                    top ? 'flex' : 'hidden'
                )}
            >
                Site under construction. There may be broken links or fake content.
            </p>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={clsx('flex items-center', top ? 'h-20' : 'h-16')}>
                    {/* Mobile menu */}
                    <MobileMenu categoryTree={categoryTree} />

                    {/* Logo */}
                    <div className="ml-4 flex lg:ml-0">
                        <Logo />
                    </div>

                    {/* Flyout menus */}
                    <FlyoutMenu categoryTree={categoryTree} />

                    <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <a href="#" className="text-sm font-medium ">
                                Sign in
                            </a>
                            <a href="#" className="text-sm font-medium ">
                                Create account
                            </a>
                        </div>

                        {/* <div className="hidden lg:ml-8 lg:flex">
                                <a href="#" className="flex items-center ">
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
                            </div> */}
                        <div className="hidden lg:ml-8 lg:flex">
                            <ThemeToggler />
                        </div>

                        {/* Search */}
                        <div className="flex lg:ml-6">
                            <a href="#" className="p-2 ">
                                <span className="sr-only">Search</span>
                                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-6">
                            <a href="#" className="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon
                                    className="h-6 w-6 flex-shrink-0 "
                                    aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium ">0</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
