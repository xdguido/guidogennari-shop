import { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import ThemeToggler from '@ui/ThemeToggler';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';

const mainNav = [
    { name: 'Solutions', href: '/' },
    { name: 'About', href: '/' },
    { name: 'Contact', href: '/' }
];

const profileNav = [
    { name: 'Your profile', href: '/profile' },
    { name: 'Settings', href: '/settings' }
];

export default function Header() {
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
                'fixed  w-full z-30 md:bg-opacity-90 transition duration-150 ease-in-out',
                !top && 'bg-white backdrop-blur-sm shadow-lg'
            )}
        >
            {/* <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8"> */}
            <div
                className={clsx(
                    'relative flex flex-1 items-center justify-between',
                    'max-w-6xl h-16 mx-auto px-5 sm:px-6 lg:px-8'
                )}
            >
                {/* <div className="flex flex-1 items-center justify-between h-16"> */}
                <div className="hidden sm:flex flex-shrink-0 items-center">
                    <Logo />
                </div>
                <div className="hidden sm:flex items-center">
                    {/* Large screen navigation */}
                    <nav className="sm:ml-6 flex items-center">
                        <ul className="flex items-center gap-5">
                            {mainNav.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="font-medium text-sm hover:text-blue-600"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center pl-5 ml-5 border-l border-l-slate-200">
                            <ThemeToggler />
                            <Button>
                                <FaGithub className="h-5 w-5" />
                            </Button>
                        </div>
                    </nav>
                </div>
                {/* Mobile navigation  */}
                <Menu as="div" className="relative sm:hidden">
                    {({ open }) => (
                        <>
                            <div className="flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Menu.Button as={Button}>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                                    )}
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    as="nav"
                                    className="absolute right-0 top-[4rem] min-w-[16rem] bg-gray-50 font-semibold rounded-md shadow px-8 py-5"
                                >
                                    <div className="flex flex-col gap-5 pt-2 pb-4 mb-4 border-b border-b-gray-200">
                                        {mainNav.map((item) => (
                                            <Menu.Item key={item.name}>
                                                <Link href={item.href} className="w-full">
                                                    {item.name}
                                                </Link>
                                            </Menu.Item>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center">
                                            Change theme <ThemeToggler />
                                        </div>
                                        <div className="flex items-center">
                                            GitHub
                                            <Button>
                                                <FaGithub className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
                {/* User navigation  */}
                {true ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* <button
                            type="button"
                            className="rounded-full bg-slate-100 p-1 text-gray-600 "
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="">
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.image_url || profilePicture}
                                        referrerPolicy="no-referrer"
                                        alt={user.name}
                                    /> */}
                                    <Image
                                        priority
                                        src="/images/profile.jpg"
                                        className="rounded-full"
                                        height={50}
                                        width={50}
                                        alt="user pic"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-min-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <span className="block px-4 py-2 text-sm text-gray-400">
                                        {/* {user.email} */}
                                        guidogennari95@gmail.com
                                    </span>
                                    {profileNav.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => <Button>{item.name}</Button>}
                                        </Menu.Item>
                                    ))}
                                    <Menu.Item>
                                        {({ active }) => <Button>Log out</Button>}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                ) : (
                    <>
                        <Button>Log In</Button>
                        <Button>Sign Up</Button>
                    </>
                )}
            </div>
        </header>
    );
}
