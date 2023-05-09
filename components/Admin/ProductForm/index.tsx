/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import type { Product } from '@prisma/client';
import clsx from 'clsx';
import Button from '@ui/Button';
import Input from '@ui/Input';
import MediaUpload from './MediaUpload';
import CategoryCombobox from './CategoryMenu';
import fetcher from '@lib/fetcher';
import ThumbnailUpload from './ThumbnailUpload';

type Props = {
    type?: 'add' | 'update';
    defaultValues?: Product & { categoryId: string };
    onFormSubmit: (data: FieldValues) => Promise<void>;
} & React.HTMLProps<HTMLDivElement>;

export default function ProductForm({
    type = 'add',
    defaultValues,
    onFormSubmit,
    ...props
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    // const [thumbnailFile, setThumbnailFile] = useState('');
    // const [mediaFiles, setMediaFiles] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    useEffect(() => {
        if (defaultValues) {
            setValue('name', defaultValues.name);
            setValue('description', defaultValues.description);
            setValue('price', defaultValues.price);
            setValue('stock', defaultValues.stock);
            setValue('thumbnail', defaultValues.thumbnail);
            setValue('media', defaultValues.media);
            setValue('categoryId', defaultValues.categoryId);
        }
    }, [defaultValues, setValue]);

    const uploadMedia = async (mediaFiles: File[]): Promise<string[]> => {
        if (!mediaFiles.length) {
            return [];
        }
        const urls = await Promise.all(
            mediaFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('ml_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
                formData.append('file', file);

                const { timestamp, signature } = await fetcher('/api/cloudinary-sign', {
                    method: 'POST'
                });
                const data = await fetcher(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );
                return data.secure_url;
            })
        );
        return urls;
    };

    const uploadThumbnail = async (thumbnailFile: File): Promise<string> => {
        if (!thumbnailFile) {
            return;
        }
        const formData = new FormData();
        formData.append('ml_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
        formData.append('file', thumbnailFile);

        const { timestamp, signature } = await fetcher('/api/cloudinary-sign', {
            method: 'POST'
        });
        const data = await fetcher(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
            {
                method: 'POST',
                body: formData
            }
        );
        return data.secure_url;
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            data.media = [
                ...(data.media ? data.media : []),
                ...(await uploadMedia(data.mediaFiles))
            ];
            data.thumbnail = await uploadThumbnail(data.thumbnailFile);
            await onFormSubmit(data);
            debugger;
            setIsLoading(false);
            reset();
        } catch (e) {
            setIsLoading(false);
            console.error(e);
            // throw toast
        }
    });

    return (
        <div {...props} className="flex flex-col space-y-6">
            <form>
                <Input
                    name="name"
                    label="Name of the Product"
                    placeholder="My beautiful product..."
                    type="text"
                    error={errors.name ? (errors.name.message as string) : null}
                    register={register('name', {
                        required: {
                            value: true,
                            message: 'You must add the name of your product.'
                        }
                    })}
                />
                <Input
                    name="description"
                    label="Description (optional)"
                    placeholder="Warm and cozy. Beautiful and elegant..."
                    type="textarea"
                    register={register('description')}
                />
                <CategoryCombobox
                    defaultValue={defaultValues?.categoryId}
                    setValue={setValue}
                    error={errors.categoryId ? (errors.categoryId.message as string) : null}
                    register={register('categoryId', {
                        required: {
                            value: true,
                            message: 'You must add a category.'
                        }
                    })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                        name="price"
                        label="Price"
                        placeholder="36.5"
                        type="number"
                        error={errors.price ? (errors.price.message as string) : null}
                        register={register('price', {
                            required: {
                                value: true,
                                message: 'You must add the price of your product.'
                            },
                            setValueAs: (v) => parseFloat(v)
                        })}
                    />
                    <Input
                        name="stock"
                        label="Stock"
                        placeholder="1000"
                        type="number"
                        error={errors.stock ? (errors.stock.message as string) : null}
                        register={register('stock', {
                            required: {
                                value: true,
                                message: 'You must add the stock of your product.'
                            },
                            setValueAs: (v) => parseInt(v)
                        })}
                    />
                </div>
                <ThumbnailUpload defaultValue={defaultValues?.thumbnail} setValue={setValue} />
                <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} />
            </form>

            <Button
                onClick={onSubmit}
                className={clsx('btn-primary btn-block', isLoading ? 'loading' : '')}
            >
                {`${type} Product`}
            </Button>
        </div>
    );
}
