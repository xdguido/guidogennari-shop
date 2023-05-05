/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import type { Product } from '@prisma/client';
import Button from '@ui/Button';
import Input from '@ui/Input';
import FormSection from './Section';
import MediaUpload from './MediaUpload';
import ThumbnailUpload from './ThumbnailUpload';
import CategoryCombobox from './CategoryMenu';

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

    const onSubmit = handleSubmit(async (data) => {
        await onFormSubmit(data);
        reset();
    });

    return (
        <div {...props} className="flex flex-col space-y-6">
            <form>
                <FormSection defaultOpen={true} title={'Product Information'}>
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
                </FormSection>
            </form>
            <FormSection title={'Thumbnail Upload'}>
                <ThumbnailUpload defaultValue={defaultValues?.thumbnail} setValue={setValue} />
            </FormSection>
            <FormSection title={'Media Upload'}>
                <MediaUpload defaultValues={defaultValues?.media} setValue={setValue} />
            </FormSection>

            <Button onClick={onSubmit} className="btn-primary btn-block">
                {`${type} Product`}
            </Button>
        </div>
    );
}
