import { Fragment } from 'react';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { navigation } from './navigation';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function FlyoutMenu() {
    return (
        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                        {({ open }) => (
                            <>
                                <div className="relative flex">
                                    <Popover.Button
                                        className={classNames(
                                            open
                                                ? 'border-primary text-primary'
                                                : 'border-transparent ',
                                            'relative z-50 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                        )}
                                    >
                                        {category.name}
                                    </Popover.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Popover.Panel className="absolute z-50 inset-x-0 top-full text-sm ">
                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                        <div
                                            className="absolute inset-0 top-1/2 shadow"
                                            aria-hidden="true"
                                        />

                                        <div className="relative bg-base-100">
                                            <div className="mx-auto max-w-7xl px-8">
                                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                        {category.featured.map((item) => (
                                                            <div
                                                                key={item.name}
                                                                className="group relative text-base sm:text-sm"
                                                            >
                                                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-base-200 group-hover:opacity-75">
                                                                    <Image
                                                                        src={item.imageSrc}
                                                                        alt={item.imageAlt}
                                                                        // width={100}
                                                                        // height={100}
                                                                        fill
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
                                                                <p
                                                                    aria-hidden="true"
                                                                    className="mt-1"
                                                                >
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                        {category.sections.map((section) => (
                                                            <div key={section.name}>
                                                                <p
                                                                    id={`${section.name}-heading`}
                                                                    className="font-medium "
                                                                >
                                                                    {section.name}
                                                                </p>
                                                                <ul
                                                                    role="list"
                                                                    aria-labelledby={`${section.name}-heading`}
                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                >
                                                                    {section.items.map((item) => (
                                                                        <li
                                                                            key={item.name}
                                                                            className="flex"
                                                                        >
                                                                            <a
                                                                                href={item.href}
                                                                                className=""
                                                                            >
                                                                                {item.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                ))}

                {navigation.pages.map((page) => (
                    <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium "
                    >
                        {page.name}
                    </a>
                ))}
            </div>
        </Popover.Group>
    );
}
