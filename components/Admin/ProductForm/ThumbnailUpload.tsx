/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '@ui/Button';
import Input from '@ui/Input';
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
    const [imageSrc, setImageSrc] = useState<string>(defaultValue);
    const [imageFile, setImageFile] = useState<File>(null);

    useEffect(() => {
        setValue('media', imageSrc);
    }, [imageSrc, setValue]);
    useEffect(() => {
        setValue('thumbnailFile', imageFile);
    }, [imageFile, setValue]);

    type FileListArray = Array<File & { readonly preview?: string }>;
    const handleOnChange = (
        changeEvent: React.ChangeEvent<HTMLInputElement & { readonly files: FileListArray }>
    ): void => {
        const targetFiles: FileListArray = changeEvent.target.files;
        const targetFilesObject = [...targetFiles];
        setImageSrc(null);
        setImageFile(targetFilesObject[0]);
    };

    const handleOnRemoveLocal = (): void => {
        setImageFile(null);
    };
    const handleOnRemoveCloud = (): void => {
        setImageSrc(null);
    };

    return (
        <>
            <Input
                name="file"
                label="Upload thumbnail"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleOnChange}
            />
            <div>
                <div className="mb-2 grid max-w-full grid-cols-2 gap-4 overflow-hidden">
                    {imageSrc ? (
                        <div className="relative">
                            <div className="aspect-w-1 aspect-h-1 rounded overflow-hidden">
                                <Image
                                    className="object-cover object-center"
                                    src={imageSrc}
                                    alt="image preview"
                                    fill
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleOnRemoveCloud()}
                                className="absolute bottom-0 right-0 btn-accent btn-circle btn-sm"
                            >
                                <TrashIcon aria-hidden={true} className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : null}

                    {imageFile ? (
                        <div className="relative">
                            <div className="aspect-w-1 aspect-h-1 rounded overflow-hidden">
                                <Image
                                    className="object-cover object-center"
                                    src={URL.createObjectURL(imageFile)}
                                    alt="image preview"
                                    fill
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleOnRemoveLocal()}
                                className="absolute bottom-0 right-0 btn-accent btn-circle btn-sm"
                            >
                                <TrashIcon aria-hidden={true} className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
