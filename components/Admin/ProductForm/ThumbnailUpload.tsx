/* eslint-disable react/prop-types */
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Button from '@ui/Button';
import fetcher from '@lib/fetcher';
import { FieldValues, Path, SetValueConfig } from 'react-hook-form';

export type CloudinarySignatureResponse = {
    timestamp: number;
    signature: string;
};

type Props = {
    defaultValue: string;
    setValue: (
        name: Path<FieldValues>,
        value: FieldValues[Path<FieldValues>],
        options?: SetValueConfig
    ) => void;
};

export default function ThumbnailUpload({ defaultValue, setValue }: Props) {
    const [imageSrc, setImageSrc] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState();
    // const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>): void => {
    //     const reader = new FileReader();
    //     reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
    //         const target = onLoadEvent.target as FileReader;
    //         setImageSrc(target.result as string);
    //         setUploadData(undefined);
    //     };
    //     reader.readAsDataURL(changeEvent.target.files[0]);
    // };
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedFiles: FileList = changeEvent.target.files;
        const firstSelectedFile = selectedFiles[0];

        if (firstSelectedFile) {
            const imageSrc = URL.createObjectURL(firstSelectedFile);
            setImageSrc(imageSrc);
            setUploadData(undefined);
        }
    };

    const handleUpload = async (uploadEvent: React.FormEvent<HTMLFormElement>): Promise<void> => {
        uploadEvent.preventDefault();
        setLoading(true);
        const form = uploadEvent.currentTarget;
        const fileInput = Array.from(form.elements) as HTMLInputElement[];
        const fileInputElement = fileInput.find((input) => input.name === 'file');
        try {
            const formData = new FormData();
            formData.append('ml_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

            const files = fileInputElement.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('file', file);
            }
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
            setImageSrc(data.secure_url);
            setValue('thumbnail', data.secure_url);
            setUploadData(data);
        } catch (error) {
            console.error(`throw toaster error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleUpload}>
            <input
                name="file"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleOnChange}
                className="mb-3 w-full rounded-md border p-3 focus:border-primary focus:ring-primary"
            />
            <div>
                {imageSrc && (
                    <Image
                        className="mx-auto mb-2 border border-accent rounded"
                        src={imageSrc}
                        alt="upload image"
                        height={200}
                        width={200}
                    />
                )}
                {imageSrc && !uploadData && (
                    <Button
                        type="submit"
                        className={clsx('btn-primary btn-block', loading ? 'loading' : '')}
                    >
                        Upload
                    </Button>
                )}
            </div>
        </form>
    );
}
