/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { CategoryContextType } from '@lib/types';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import type { CategoryWithChildren } from '@lib/types';

const defaultCategory: CategoryContextType = {
    categories: []
};

export const CategoryContext = createContext(defaultCategory);

export const useCategory = () => useContext(CategoryContext);

type Props = {
    children: React.ReactNode;
};

export default function CategoryProvider({ children }: Props) {
    const { data: categories } = useSwr<CategoryWithChildren[]>('/api/categories', fetcher);

    return (
        <CategoryContext.Provider
            value={{
                categories
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}
