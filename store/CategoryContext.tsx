/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { CategoryContextType } from '@types';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { CategoryWithChildren } from '@lib/getProducts';

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