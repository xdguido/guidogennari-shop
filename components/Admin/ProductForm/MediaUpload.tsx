/* eslint-disable react/prop-types */
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Button from '@ui/Button';

export type CloudinarySignatureResponse = {
    timestamp: number;
    signature: string;
};

const MediaUpload = ({ defaultValues = [], setValue }) => {
    const [imageSrc, setImageSrc] = useState([...defaultValues]);
    const [loading, setLoading] = useState(false);
    const [uploadedData, setUploadedData] = useState(false);

    type FileListArray = Array<File & { readonly preview?: string }>;
    const handleOnChange = (
        changeEvent: React.ChangeEvent<HTMLInputElement & { readonly files: FileListArray }>
    ): void => {
        const selectedFiles: string[] = [];
        const targetFiles: FileListArray = changeEvent.target.files;
        const targetFilesObject = [...targetFiles];
        targetFilesObject.map((file) => {
            return selectedFiles.push(URL.createObjectURL(file));
        });
        setImageSrc(selectedFiles);
    };

    const handleUpload = async (uploadEvent: React.FormEvent<HTMLFormElement>): Promise<void> => {
        uploadEvent.preventDefault();
        setLoading(true);
        const form = uploadEvent.currentTarget;
        const fileInput = Array.from(form.elements) as HTMLInputElement[];
        const fileInputElement = fileInput.find((input) => input.name === 'file');
        try {
            // adding upload preset
            const filesArr: File[] = [];
            const files = fileInputElement.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                filesArr.push(file);
            }
            const urls = await Promise.all(
                filesArr.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('ml_preset', process.env.CLOUDINARY_CLOUD_NAME);

                    const sign = await fetch('/api/cloudinary-sign', {
                        method: 'POST'
                    });
                    const { timestamp, signature } =
                        (await sign.json()) as CloudinarySignatureResponse;

                    const res = await fetch(
                        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                        {
                            method: 'POST',
                            body: formData
                        }
                    );
                    const data = await res.json();
                    return data.secure_url;
                })
            );

            setImageSrc(urls);
            setValue('media', urls);
            setUploadedData(true);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleUpload}>
            <label htmlFor="file" className="mb-1 block text-sm text-gray-600">
                Upload multiple files
            </label>
            <input
                name="file"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                multiple
                onChange={handleOnChange}
                className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
            />
            <div>
                <div className="mb-2 grid max-w-full grid-cols-2 gap-2 overflow-hidden">
                    {imageSrc.map((i, idx) => (
                        <div key={idx}>
                            <Image
                                className="aspect-video max-h-40 flex-1 overflow-hidden rounded"
                                src={i}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
                {imageSrc.length && !uploadedData ? (
                    <Button
                        type="submit"
                        className={clsx('btn-primary btn-block', loading ? 'loading' : '')}
                    >
                        Upload
                    </Button>
                ) : null}
            </div>
        </form>
    );
};

export default MediaUpload;
