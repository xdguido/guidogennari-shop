import { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
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
                'fixed  w-full z-30 md:bg-opacity-90 bg-base-100 transition duration-150 ease-in-out',
                !top && ' backdrop-blur-sm shadow-lg'
            )}
        >
            <div
                className={clsx(
                    'relative flex flex-1 items-center justify-between',
                    'max-w-6xl h-16 mx-auto px-5 sm:px-6 lg:px-8'
                )}
            >
                <div className="hidden sm:flex items-center">
                    <div className="hidden sm:flex flex-shrink-0 items-center">
                        <Logo />
                    </div>
                    {/* Large screen navigation */}
                    <nav className="sm:ml-6 flex items-center">
                        <ul className="flex items-center gap-1">
                            {mainNav.map((item) => (
                                <li key={item.name}>
                                    <Button
                                        href={item.href}
                                        className="btn-link btn-sm no-underline no-animation"
                                    >
                                        {item.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center pl-5 ml-5 border-l border-l-base-300">
                            <ThemeToggler />
                            <Button className="btn-ghost btn-square">
                                <FaGithub className="h-5 w-5" />
                            </Button>
                        </div>
                    </nav>
                </div>
                {/* Mobile navigation  */}
                <Menu as="div" className="relative sm:hidden">
                    {({ open }) => (
                        <>
                            <div className="flex sm:hidden">
                                {/* Mobile menu button */}
                                <Menu.Button
                                    as={Button}
                                    className="btn-ghost btn-square no-animation"
                                >
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
                                    className="absolute left-0 top-[4rem] min-w-[16rem] bg-base-100 font-semibold rounded-md shadow-2xl px-8 py-5"
                                >
                                    <div className="flex flex-col gap-3 items-start py-2">
                                        {mainNav.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <Button
                                                        href={item.href}
                                                        className={`${
                                                            active ? 'bg-base-200' : ''
                                                        } btn-link btn-sm no-underline no-animation`}
                                                    >
                                                        {item.name}
                                                    </Button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                    <div className="divider"></div>
                                    <div className="flex flex-col gap-3">
                                        <Menu.Item>
                                            <div className="flex items-center">
                                                Change theme <ThemeToggler />
                                            </div>
                                        </Menu.Item>
                                        <div className="flex items-center">
                                            GitHub
                                            <Button className="btn-ghost btn-square">
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
                    <>
                        {/* <div className="flex items-center justify-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> */}
                        {/* <button
                            type="button"
                            className="rounded-full bg-slate-100 p-1 text-gray-600 "
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative flex">
                            <Menu.Button as={Button} className="btn-ghost btn-circle no-animation">
                                <span className="sr-only">Open user menu</span>
                                <Image
                                    src="/images/profile.jpg"
                                    className="rounded-full"
                                    height={50}
                                    width={50}
                                    alt="user pic"
                                />
                            </Menu.Button>
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
                                    className="truncate w-56 absolute right-0 top-[4rem] z-10 rounded-md bg-base-100 p-3 shadow-2xl"
                                    // className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100"
                                >
                                    <span className="text-sm text-base-content">
                                        {/* {user.email} */}
                                        dasdasdasdasddaasdsd@gmail.com
                                    </span>
                                    <div className="divider"></div>
                                    {profileNav.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <Button
                                                    href={item.href}
                                                    className={`${
                                                        active ? 'bg-base-200' : ''
                                                    } flex justify-start mb-2 btn-link btn-sm no-underline no-animation`}
                                                >
                                                    {item.name}
                                                </Button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Button
                                                className={`${
                                                    active ? 'ring ring-primary' : ''
                                                } mt-2 btn-default btn-block btn-sm`}
                                            >
                                                Log out
                                            </Button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        {/* </div> */}
                    </>
                ) : (
                    <>
                        <Button className="btn-outline">Log In</Button>
                        <Button>Sign Up</Button>
                    </>
                )}
            </div>
        </header>
    );
}
