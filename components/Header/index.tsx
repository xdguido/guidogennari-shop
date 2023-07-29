import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import clsx from 'clsx';
import MobileMenu from './MobileMenu';
import MobileNav from './MobileNav';
import FlyoutMenu from './FlyoutMenu';
import Cart from './Cart';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import PopoverMenu from './PopoverMenu';

export default function Header({ shop }: { shop: boolean }) {
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
            {/* <p
                className={clsx(
                    'z-50 flex h-10 items-center justify-center bg-primary px-2 text-center text-sm font-medium text-primary-content lg:px-8'
                )}
            >
                Site under construction. There may be broken links or fake content.
            </p> */}
            <header
                className={clsx(
                    'sticky top-0 z-50 w-full bg-base-contrast lg:bg-base-100'
                    // top ? '' : 'lg:border-b lg:border-b-neutral'
                )}
            >
                <nav aria-label="Top" className="mx-auto max-w-[1600px]">
                    <div className="flex h-16 items-center px-2 lg:h-20 lg:px-4">
                        <div className="ml-2 flex lg:ml-0">
                            <Logo />
                        </div>
                        <FlyoutMenu />
                        <div className="ml-auto flex items-center">
                            <div className="flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {session ? null : (
                                    <Button
                                        onClick={() => {
                                            signIn();
                                        }}
                                        className="btn-primary btn-sm shadow lg:btn-md"
                                    >
                                        Sign in
                                    </Button>
                                )}
                            </div>
                            <div className="ml-3">
                                <Cart />
                            </div>
                            <div className="ml-3">
                                <MobileNav />
                            </div>
                            <div className="ml-1">
                                <PopoverMenu />
                            </div>
                        </div>
                    </div>
                    {shop && <MobileMenu />}
                </nav>
            </header>
        </>
    );
}
