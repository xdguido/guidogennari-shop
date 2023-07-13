import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
import MobileMenu from './MobileMenu';
import MobileNav from './MobileNav';
import FlyoutMenu from './FlyoutMenu';
import Cart from './Cart';
import Logo from '@ui/Logo';
import ThemeToggler from '@ui/ThemeToggler';
import Button from '@ui/Button';

export default function Header() {
    const [top, setTop] = useState(true);
    const { data: session } = useSession();
    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);
    return (
        <>
            <p
                className={clsx(
                    'flex h-10 z-50 text-center items-center justify-center bg-primary text-sm text-primary-content font-medium px-2 lg:px-8'
                )}
            >
                Site under construction. There may be broken links or fake content.
            </p>
            <header
                className={clsx(
                    'sticky top-0 w-full z-50 bg-base-100 transition duration-150 ease-in-out motion-reduce:transition-none',
                    top ? '' : 'lg:shadow-md'
                )}
            >
                <nav aria-label="Top" className="mx-auto max-w-[1600px]">
                    <div className="flex items-center h-16 px-2 lg:px-4">
                        {/* Logo */}
                        <div className="ml-2 flex lg:ml-0">
                            <Logo />
                        </div>

                        {/* Flyout menus */}
                        <FlyoutMenu />

                        <div className="ml-auto flex items-center">
                            <div className="flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {session ? (
                                    <Button
                                        onClick={() => {
                                            signOut();
                                        }}
                                        className="btn-primary btn-sm normal-case "
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
                            </div>

                            <div className="hidden ml-4 lg:flex">
                                <ThemeToggler />
                            </div>

                            {/* Search */}
                            {/* <div className="flex lg:ml-6">
                                <a href="#" className="p-2 ">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div> */}

                            {/* Cart */}
                            <div className="ml-3">
                                <Cart />
                            </div>
                            {/* Mobile nav */}
                            <div className="ml-3">
                                <MobileNav />
                            </div>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <MobileMenu />
                </nav>
            </header>
        </>
    );
}
