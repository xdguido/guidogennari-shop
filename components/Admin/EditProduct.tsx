import type { Product } from '@prisma/client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '@ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import fetcher from '@lib/fetcher';
import ProductForm from './ProductForm';

type Props = { product: Product; label: string; className: string };

export default function EditProduct({ product, label, className }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isWarn, setIsWarn] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const handleOpenWarn = () => setIsWarn(true);
    const handleCloseWarn = () => setIsWarn(false);
    const onFormSubmit = async (data: Product) => {
        const stockDiff: number = Number(data.stock) - product.stock;

        const updatedData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => {
                if (key === 'id') {
                    return true; // keep the id property
                }
                return value !== product[key];
            })
        );
        updatedData.stock = stockDiff;

        fetcher(`/api/product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(() => {
                handleClose();
            })
            .catch(() => {
                return null;
            });
    };

    return (
        <>
            <button onClick={handleOpen} className={className}>
                {label}
            </button>
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
                                        <h3>Edit Product</h3>
                                        <Button
                                            onClick={handleOpenWarn}
                                            className="btn-ghost btn-square"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </Button>
                                    </Dialog.Title>

                                    <ProductForm
                                        type="update"
                                        defaultValues={product}
                                        onFormSubmit={onFormSubmit}
                                    />
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
                                            className="btn-outline no-animation btn-sm"
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
