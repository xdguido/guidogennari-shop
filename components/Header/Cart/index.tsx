import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ShoppingBagIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '@ui/Button';
import { useCart } from '@lib/store/CartContext';
import ProductItem from './ProductItem';

export default function Cart() {
    const [open, setOpen] = useState(false);
    const { cart } = useCart();
    // const subtotal = products.reduce((acc, product) => {
    //     return acc + Number(product.price) * product.quantity;
    // }, 0);
    return (
        <>
            <div className="indicator">
                {cart.length ? (
                    <span className="badge-info badge badge-sm indicator-item">{cart.length}</span>
                ) : null}

                <Button
                    className="btn-outline btn-square btn-sm bg-base-contrast"
                    onClick={() => setOpen(true)}
                >
                    <span className="sr-only">Open cart</span>
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    {/* <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-base-300 bg-opacity-75 transition-opacity" />
                    </Transition.Child> */}

                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md border border-neutral bg-base-100">
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
                                                {!cart.length ? (
                                                    <p className="text-center text-lg text-neutral">
                                                        Your cart is empty
                                                    </p>
                                                ) : (
                                                    <div className="flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-neutral"
                                                        >
                                                            {cart.map((product) => (
                                                                <ProductItem
                                                                    key={product.slug}
                                                                    slug={product.slug}
                                                                    quantity={product.quantity}
                                                                />
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
                                                    {/* <p>$ {subtotal.toLocaleString('es')}</p> */}
                                                    <div
                                                        className="tooltip tooltip-left tooltip-info before:w-[12rem] before:content-[attr(data-tip)]"
                                                        data-tip="Special price paying with cash or bank deposit"
                                                    >
                                                        <InformationCircleIcon className="h-5 w-5 text-info" />
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
                                                        !cart.length ? 'btn-disabled' : ''
                                                    )}
                                                >
                                                    Checkout
                                                </Button>
                                            </div>
                                            <div className="flex justify-center text-center text-sm text-neutral sm:mt-6">
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
