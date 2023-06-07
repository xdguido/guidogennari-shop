import { Fragment, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import {
    XMarkIcon,
    ShoppingBagIcon,
    MinusIcon,
    PlusIcon,
    InformationCircleIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import Button from '@ui/Button';
import Link from 'next/link';
import { useCart } from '@lib/store/CartContext';

export default function Cart() {
    const [open, setOpen] = useState(false);
    const { cart: products, removeProduct, updateProductQuantity } = useCart();
    const subtotal = products.reduce((acc, product) => {
        return acc + Number(product.price) * product.quantity;
    }, 0);
    return (
        <>
            <div className="indicator">
                {products.length ? (
                    <span className="indicator-item  badge badge-accent px-1.5">
                        {products.length}
                    </span>
                ) : null}

                <Button className="btn-ghost btn-square btn-sm" onClick={() => setOpen(true)}>
                    <span className="sr-only">Open cart</span>
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-base-300 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed pointer-events-none inset-y-0 right-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-base-100">
                                    <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium ">
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <Button
                                                        className="btn-ghost btn-square -m-2 p-2 "
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                {!products.length ? (
                                                    <p className="text-lg text-center text-neutral">
                                                        Your cart is empty
                                                    </p>
                                                ) : (
                                                    <div className="flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-neutral"
                                                        >
                                                            {products.map((product) => (
                                                                <li
                                                                    key={product.slug}
                                                                    className="grid grid-cols-4 py-6"
                                                                >
                                                                    <div>
                                                                        <div className=" overflow-hidden rounded bg-base-200">
                                                                            <Image
                                                                                src={
                                                                                    product.imageSrc
                                                                                }
                                                                                alt={
                                                                                    product.imageAlt
                                                                                }
                                                                                width={100}
                                                                                height={100}
                                                                                className="object-cover object-center"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="ml-4 col-span-3 grid grid-col-1 gap-2">
                                                                        <h3 className=" leading-tight text-sm font-medium  ">
                                                                            <Link
                                                                                href={`/product/${product.slug}`}
                                                                            >
                                                                                {product.name}
                                                                            </Link>
                                                                        </h3>

                                                                        <div className="flex gap-2">
                                                                            <p className=" text-sm">
                                                                                ${' '}
                                                                                {Number(
                                                                                    product.price
                                                                                ).toLocaleString(
                                                                                    'es'
                                                                                )}
                                                                            </p>

                                                                            <span className="flex gap-2 text-sm text-success ">
                                                                                <CheckIcon className=" h-5 w-5" />{' '}
                                                                                Stock available
                                                                            </span>
                                                                        </div>

                                                                        <div className="flex flex-1 justify-between text-sm">
                                                                            <div className="flex items-center mr-2">
                                                                                <Button
                                                                                    className={clsx(
                                                                                        'btn-outline btn-sm btn-square',
                                                                                        product.quantity ==
                                                                                            1
                                                                                            ? 'btn-disabled'
                                                                                            : ''
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        updateProductQuantity(
                                                                                            product.slug,
                                                                                            product.quantity -
                                                                                                1
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <MinusIcon className="h-5 w-5" />
                                                                                </Button>
                                                                                <span className="px-3 font-semibold text-base">
                                                                                    {
                                                                                        product.quantity
                                                                                    }
                                                                                </span>
                                                                                <Button
                                                                                    className={clsx(
                                                                                        'btn-outline btn-sm btn-square',
                                                                                        product.quantity ==
                                                                                            5
                                                                                            ? 'btn-disabled'
                                                                                            : ''
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        updateProductQuantity(
                                                                                            product.slug,
                                                                                            product.quantity +
                                                                                                1
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <PlusIcon className="h-5 w-5" />
                                                                                </Button>
                                                                            </div>

                                                                            <Button
                                                                                className="btn-ghost btn-sm normal-case no-underline"
                                                                                onClick={() =>
                                                                                    removeProduct(
                                                                                        product.slug
                                                                                    )
                                                                                }
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t border-neutral px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium ">
                                                <p>Subtotal</p>
                                                <div className="flex items-center gap-2">
                                                    <p>$ {subtotal.toLocaleString('es')}</p>
                                                    <div
                                                        className="tooltip tooltip-left tooltip-info before:w-[12rem] before:content-[attr(data-tip)]"
                                                        data-tip="Special price paying with cash or bank deposit"
                                                    >
                                                        <InformationCircleIcon className="text-info h-5 w-5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-0.5 text-sm text-neutral">
                                                Shipping and taxes calculated at checkout.
                                            </p>
                                            <div className="mt-6">
                                                <Button
                                                    className={clsx(
                                                        'btn-primary btn-block',
                                                        !products.length ? 'btn-disabled' : ''
                                                    )}
                                                >
                                                    Checkout
                                                </Button>
                                            </div>
                                            <div className="sm:mt-6 flex justify-center text-center text-sm text-neutral">
                                                <p>
                                                    or
                                                    <Button
                                                        className="btn-link normal-case no-underline"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </Button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
