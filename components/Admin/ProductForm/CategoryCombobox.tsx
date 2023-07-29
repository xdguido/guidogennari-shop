/* eslint-disable react/prop-types */
import type { CategoryNode } from '@lib/types';
import type { Category } from '@prisma/client';
import type { FieldValues, Path, SetValueConfig } from 'react-hook-form';
import { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Input from '@ui/Input';

type Props = {
    defaultValue?: string;
    setValue: (
        name: Path<FieldValues>,
        value: FieldValues[Path<FieldValues>],
        options?: SetValueConfig
    ) => void;
    error?: string | null;
    register: object;
};

export default function CategoryCombobox({ defaultValue, setValue, error, register }: Props) {
    const [query, setQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const { data: categories } = useSwr<CategoryNode[]>('/api/category', fetcher);

    useEffect(() => {
        if (defaultValue && categories) {
            const categoryWithDefaultValue = categories.find(
                (category) => category.id === defaultValue
            );
            if (categoryWithDefaultValue) {
                setSelectedCategory(categoryWithDefaultValue);
            } else {
                const childCategoryWithDefaultValue = categories.reduce((acc, category) => {
                    if (acc) return acc;
                    return category.children.find((child) => child.id === defaultValue);
                }, null);
                setSelectedCategory(childCategoryWithDefaultValue || undefined);
            }
        }
    }, [defaultValue, categories]);

    useEffect(() => {
        if (selectedCategory) {
            setValue('categoryId', selectedCategory.id, { shouldValidate: true });
        }
    }, [selectedCategory, setValue]);

    const filterCategories = (categories: CategoryNode[], query: string): CategoryNode[] => {
        return categories.reduce<CategoryNode[]>((acc, category) => {
            const filteredChildren =
                category.children &&
                category.children.filter((child) => {
                    return child.name
                        .toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(query.toLowerCase().replace(/\s+/g, ''));
                });

            if (filteredChildren && filteredChildren.length > 0) {
                acc.push({
                    ...category,
                    children: filteredChildren
                });
            }

            return acc;
        }, []);
    };

    const filteredCategories = filterCategories(categories, query);

    return (
        <Combobox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative z-20 mb-3 cursor-pointer">
                <Combobox.Button className="relative w-full text-left sm:text-sm">
                    {({ open }) => (
                        <>
                            <Combobox.Input
                                as={Input}
                                label="Select a category"
                                name="categoryId"
                                value={query || selectedCategory?.name}
                                onChange={(event) => setQuery(event.target.value)}
                                onClick={(e) => {
                                    if (open) e.stopPropagation();
                                }}
                                error={error}
                                register={register}
                                placeholder="Select a category"
                                className="cursor-pointer"
                            />
                            {/* <div className="absolute bottom-[9px] right-0 flex items-center p-2">
                                <ChevronUpDownIcon
                                    className="h-6 w-6 text-neutral"
                                    aria-hidden="true"
                                />
                            </div> */}
                        </>
                    )}
                </Combobox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-accent ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredCategories?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-neutral">
                                Nothing found.
                            </div>
                        ) : (
                            <>
                                {filteredCategories?.map((category) => (
                                    <div key={category.id}>
                                        <p className="pl-2 font-medium">{category.name}</p>
                                        {category.children.map((subcategory) => (
                                            <Combobox.Option
                                                key={subcategory.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-base-200' : ''
                                                    }`
                                                }
                                                value={subcategory}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? 'font-medium text-accent'
                                                                    : 'font-normal text-base-content'
                                                            }`}
                                                        >
                                                            {subcategory.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 text-accent ${
                                                                    selected ? 'block' : 'hidden'
                                                                }`}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
