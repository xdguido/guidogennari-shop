/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import { CategoryContextType } from '@/types';
// import useSwr from 'swr';
// import fetcher from '@lib/fetcher';
import type { CategoryNode } from '@/types';

const defaultCategory: CategoryContextType = {
    categories: []
};

export const CategoryContext = createContext(defaultCategory);

export const useCategory = () => useContext(CategoryContext);

type Props = {
    data: CategoryNode[];
    children: React.ReactNode;
};
export default function CategoryProvider({ data, children }: Props) {
    // const { data: categories } = useSwr<CategoryNode[]>('/api/category', fetcher);

    return (
        <CategoryContext.Provider
            value={{
                categories: data
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}
