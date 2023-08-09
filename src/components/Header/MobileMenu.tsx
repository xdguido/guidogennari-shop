import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { useCategory } from '~/lib/store/CategoryContext';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import SearchBar from '~/components/SearchBar';

export default function MobileMenu() {
    const { categories } = useCategory();

    return (
        <>
            <Menu as="div" className="relative lg:hidden">
                {({ open, close }) => (
                    <>
                        <Menu.Button className="flex w-full items-center gap-2 border-y border-y-neutral px-4 py-2 text-left">
                            {open ? (
                                <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                            )}
                            Products menu
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0"
                            enterTo="transform opacity-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute inset-x-0 z-40 flex h-[80vh] flex-col overflow-y-scroll border-b border-b-neutral bg-base-contrast">
                                <div className="mt-2 p-2">
                                    <SearchBar />
                                </div>
                                {/* Links */}

                                <div className="mt-3">
                                    <div className="space-y-10 p-4">
                                        {categories.map((section) => (
                                            <div key={section.name}>
                                                <p
                                                    id={`${section.id}-heading-mobile`}
                                                    className="font-bold text-neutral"
                                                >
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${section.name}-heading`}
                                                    className="mt-6 space-y-4"
                                                >
                                                    <li>
                                                        <Link
                                                            href={`/products/${section.slug}/newest`}
                                                            className="block"
                                                            onClick={close}
                                                        >
                                                            View all
                                                        </Link>
                                                    </li>
                                                    {section.children.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={`/products/${item.slug}/newest`}
                                                                className="block"
                                                                onClick={close}
                                                            >
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
                    </>
                )}
            </Menu>
        </>
    );
}
