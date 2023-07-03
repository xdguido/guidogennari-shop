/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '@ui/Button';
import Input from '@ui/Input';
import type { FieldValues, Path, SetValueConfig } from 'react-hook-form';

type Props = {
    defaultValues: string[];
    setValue: (
        name: Path<FieldValues>,
        value: FieldValues[Path<FieldValues>],
        options?: SetValueConfig
    ) => void;
};
export default function MediaUpload({ defaultValues = [], setValue }: Props) {
    const [imageSrc, setImageSrc] = useState<string[]>([...defaultValues]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    useEffect(() => {
        if (defaultValues) {
            setValue('media', defaultValues);
        }
    }, [defaultValues, setValue]);
    useEffect(() => {
        setValue('mediaFiles', imageFiles);
    }, [imageFiles, setValue]);

    type FileListArray = Array<File & { readonly preview?: string }>;
    const handleOnChange = (
        changeEvent: React.ChangeEvent<HTMLInputElement & { readonly files: FileListArray }>
    ): void => {
        const targetFiles: FileListArray = changeEvent.target.files;
        const targetFilesObject = [...targetFiles];
        setImageFiles((prevState) => [...prevState, ...targetFilesObject]);
    };

    const handleOnRemoveLocal = (file: File): void => {
        setImageFiles((prevState) => prevState.filter((item) => item !== file));
    };
    const handleOnRemoveCloud = (img: string): void => {
        setImageSrc((prevState) => prevState.filter((item) => item !== img));
    };

    return (
        <>
            <Input
                name="file"
                label="Upload images"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                multiple
                onChange={handleOnChange}
            />
            <div>
                <div className="mb-2 grid max-w-full grid-cols-2 gap-4 overflow-hidden">
                    {imageSrc.map((i, idx) => (
                        <div className="relative" key={idx}>
                            <div className="aspect-w-1 aspect-h-1 rounded overflow-hidden">
                                <Image
                                    className="object-cover object-center"
                                    src={i}
                                    alt="image preview"
                                    fill
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleOnRemoveCloud(i)}
                                className="absolute bottom-0 right-0 btn-accent btn-circle btn-sm"
                            >
                                <TrashIcon aria-hidden={true} className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                    {imageFiles.map((i, idx) => (
                        <div className="relative" key={idx}>
                            <div className="aspect-w-1 aspect-h-1 rounded overflow-hidden">
                                <Image
                                    className="object-cover object-center"
                                    src={URL.createObjectURL(i)}
                                    alt="image preview"
                                    fill
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleOnRemoveLocal(i)}
                                className="absolute bottom-0 right-0 btn-accent btn-circle btn-sm"
                            >
                                <TrashIcon aria-hidden={true} className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
