import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { useCategory } from '@lib/store/CategoryContext';

export default function MobileMenu() {
    const { categories } = useCategory();

    return (
        <>
            <Menu as="div" className="relative lg:hidden">
                <Menu.Button className="w-full px-4 py-2 text-left font-medium border-y border-y-neutral">
                    Products menu
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
                    <Menu.Items className="absolute inset-x-0 z-40 flex max-h-[70vh] overflow-y-auto flex-col bg-base-100 shadow-md border-b border-b-neutral">
                        {/* <div className="flex justify-between px-4 pt-5 pb-2">
                            <div className="flex items-center gap-2">
                                <ThemeToggler />
                            </div>
                        </div> */}

                        {/* Links */}

                        <div className="mt-3">
                            {/* <div className="border-b border-neutral">
                                <ul className="-mb-px flex space-x-8 px-4 pb-2">
                                    <li>
                                        <Link href="/products" className="font-semibold">
                                            Products
                                        </Link>
                                    </li>
                                    {navigation.pages.map((page) => (
                                        <li key={page.name}>
                                            <Link href={page.href} className="font-semibold">
                                                {page.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}

                            <div className="space-y-10 p-4">
                                {categories.map((section) => (
                                    <div key={section.name}>
                                        <p
                                            id={`${section.id}-heading-mobile`}
                                            className="font-bold "
                                        >
                                            {section.name}
                                        </p>
                                        <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-4"
                                        >
                                            <li className="flex">
                                                <Link href={`/products/${section.slug}`}>
                                                    View all
                                                </Link>
                                            </li>
                                            {section.children.map((item) => (
                                                <li key={item.name} className="flex">
                                                    <Link href={`/products/${item.slug}`}>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}
