import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Button from '@ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

import fetcher from '@lib/fetcher';

import type { Product } from '@prisma/client';
import ProductForm from '../ProductForm';

export default function AddProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [isWarn, setIsWarn] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const handleOpenWarn = () => setIsWarn(true);
    const handleCloseWarn = () => setIsWarn(false);
    const onFormSubmit = async (data: any) => {
        try {
            await fetcher(`/api/product/createProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => {
                handleClose();
                // window.location.reload();
                // use other refetch
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} className="btn-primary btn-sm">
                Add Product
            </Button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleOpenWarn}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="z-100 fixed inset-0 bg-base-300 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto bg-base-100 rounded-xl p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 "
                                    >
                                        <h3>Add Product</h3>
                                        <Button
                                            onClick={handleOpenWarn}
                                            className="btn-ghost btn-square"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </Button>
                                    </Dialog.Title>

                                    <ProductForm onFormSubmit={onFormSubmit} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isWarn} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={handleCloseWarn}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="z-100 fixed inset-0 bg-base-300 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-y-auto bg-base-100 rounded-xl p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="mb-8 flex items-center justify-between text-lg font-semibold leading-6 "
                                    >
                                        <h3>Do you want to discard changes?</h3>
                                        {/* <Button
                                            onClick={handleCloseWarn}
                                            className="btn-ghost btn-square"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </Button> */}
                                    </Dialog.Title>
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            onClick={handleCloseWarn}
                                            className="btn-primary no-animation btn-sm"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleClose();
                                                handleCloseWarn();
                                            }}
                                            className="btn-ghost no-animation btn-sm"
                                        >
                                            Discard changes
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
