import type { Product } from '@prisma/client';
import { useState, useEffect } from 'react';
import useSwr, { preload } from 'swr';
import fetcher from '@lib/fetcher';

import { SortOption } from '@types';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products() {
    const [sort, setSort] = useState(SortOption.CreatedAtDesc);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [size, setSize] = useState(16);
    const {
        data: products,
        error,
        isLoading
    } = useSwr<Product[]>(
        `/api/products?sort=${sort}&pageIndex=${currentPageIndex}&size=${size}`,
        fetcher
    );
    const { data: productsLength } = useSwr(`/api/products/length`, fetcher);
    const maxPageIndex = productsLength ? Math.ceil(Number(productsLength) / size) : 1;
    useEffect(() => {
        setCurrentPageIndex(1);
    }, [sort]);
    useEffect(() => {
        function runPreload() {
            if (currentPageIndex < maxPageIndex) {
                preload(
                    `/api/products?sort=${sort}&pageIndex=${currentPageIndex + 1}&size=${size}`,
                    fetcher
                );
            }
        }
        runPreload();
    }, [currentPageIndex, maxPageIndex, size, sort]);

    return (
        <ProductsLayout sort={sort} setSort={setSort}>
            <PaginationButtons
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                maxPageIndex={maxPageIndex}
                isTop
            />
            <ProductsList products={products} error={error} isLoading={isLoading} />
            <PaginationButtons
                currentPageIndex={currentPageIndex}
                setCurrentPageIndex={setCurrentPageIndex}
                maxPageIndex={maxPageIndex}
            />
        </ProductsLayout>
    );
}
