/* eslint-disable react/prop-types */
import type { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';

import { SortOption } from '@types';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products({ category, page }) {
    const router = useRouter();
    const [sort, setSort] = useState(SortOption.CreatedAtDesc);
    const size = 12;

    const { data, error } = useSwr([`/api/products/${page}`], fetcher);
    const { products, total } = data;
    const maxPageIndex = total ? Math.ceil(total / size) : page;

    // useEffect(() => {
    //     function runPreload() {
    //         if (page < maxPageIndex) {
    //             preload(
    //                 `/api/products?sort=${sort}&page=${page + 1}&size=${size}`,
    //                 fetcher
    //             );
    //         }
    //     }
    //     runPreload();
    // }, [page, maxPageIndex, size, sort]);

    const setPageIndex = (value: number) => {
        router.push(`/products/${value}`);
    };

    return (
        <ProductsLayout sort={sort} setSort={setSort}>
            <PaginationButtons
                currentPageIndex={page}
                setCurrentPageIndex={setPageIndex}
                maxPageIndex={maxPageIndex}
                isTop
            />
            <ProductsList products={products} />
            <PaginationButtons
                currentPageIndex={page}
                setCurrentPageIndex={setPageIndex}
                maxPageIndex={maxPageIndex}
            />
        </ProductsLayout>
    );
}
