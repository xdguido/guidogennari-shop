import type { Product } from '@prisma/client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '@ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import fetcher from '@lib/fetcher';
import ProductForm from './ProductForm';

export default function FormDialog({
    type = 'add',
    product,
    label,
    className
}: {
    type?: 'add' | 'update';
    product?: Product;
    label: string;
    className: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isWarn, setIsWarn] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const handleOpenWarn = () => setIsWarn(true);
    const handleCloseWarn = () => setIsWarn(false);

    const onUpdateSubmit = async (data: Product) => {
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

    const onAddSubmit = async (data: any) => {
        fetcher(`/api/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => handleClose())
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
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={isDirty ? handleOpenWarn : handleClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-75"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-neutral-800 bg-opacity-80" />
                    </Transition.Child>

                    <div className="fixed inset-0">
                        <div className="flex h-full flex-col items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex w-full max-w-[820px] flex-auto flex-col overflow-hidden rounded-xl bg-base-contrast p-4 text-left shadow-xl lg:p-6">
                                    <Dialog.Title className="mb-2 flex items-start justify-between">
                                        <p className="text-xl font-semibold leading-6 text-neutral">
                                            {type === 'add'
                                                ? 'Add a new product'
                                                : 'Update product content'}
                                        </p>
                                        <Button
                                            onClick={isDirty ? handleOpenWarn : handleClose}
                                            className="btn-outline btn-square"
                                        >
                                            <span className="sr-only">close modal</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </Button>
                                    </Dialog.Title>
                                    <div className="flex-auto overflow-y-auto">
                                        {type === 'add' ? (
                                            <ProductForm
                                                type={type}
                                                onFormSubmit={onAddSubmit}
                                                setIsDirty={setIsDirty}
                                            />
                                        ) : (
                                            <ProductForm
                                                type={type}
                                                defaultValues={product}
                                                onFormSubmit={onUpdateSubmit}
                                                setIsDirty={setIsDirty}
                                            />
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isWarn} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={handleCloseWarn}>
                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-175"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-175"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform rounded-xl border border-neutral bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="mb-8 flex items-center justify-between text-lg font-semibold leading-6 "
                                    >
                                        <h3>Do you want to discard changes?</h3>
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
