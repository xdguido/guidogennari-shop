import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { navigation } from './navigation';
import { CategoryWithChildren } from '@lib/getProducts';
import ThemeToggler from '@ui/ThemeToggler';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

type Props = {
    categoryTree: CategoryWithChildren[];
};

export default function MobileMenu({ categoryTree }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="rounded-md  p-2  lg:hidden"
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    <ThemeToggler />
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-base-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            <Tab
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected
                                                            ? 'border-primary text-primary'
                                                            : 'border-transparent ',
                                                        'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                    )
                                                }
                                            >
                                                Products
                                            </Tab>
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        <Tab.Panel className="space-y-10 px-4 pt-10 pb-8">
                                            {/* <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="group relative text-sm"
                                                        >
                                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-base-200 group-hover:opacity-75">
                                                                <Image
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    width={100}
                                                                    height={100}
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className="mt-6 block font-medium "
                                                            >
                                                                <span
                                                                    className="absolute inset-0 z-50"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div> */}
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
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-base-200 py-6 px-4">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a
                                                href={page.href}
                                                className="-m-2 block p-2 font-medium "
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-base-200 py-6 px-4">
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium ">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium ">
                                            Create account
                                        </a>
                                    </div>
                                </div>

                                {/* <div className="border-t border-gray-200 py-6 px-4">
                                    <a href="#" className="-m-2 flex items-center p-2">
                                        <Image
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium ">
                                            CAD
                                        </span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                    
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
