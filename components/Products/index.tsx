import type { Product } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSwr, { preload } from 'swr';
import fetcher from '@lib/fetcher';

import { SortOption } from '@types';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products() {
    const router = useRouter();
    const sortParsed = Object.values(SortOption).find(
        (option) => option === (router.query.sort as string)
    );
    const defaultSize = 12;

    const sort = sortParsed ?? SortOption.CreatedAtDesc;
    const pageIndex = router.query.page ? parseInt(router.query.page as string) : 1;
    const size = router.query.size ? parseInt(router.query.size as string) : defaultSize;

    const {
        data: products,
        error,
        isLoading
    } = useSwr<Product[]>(
        `/api/products?sort=${sort}&pageIndex=${pageIndex}&size=${size}`,
        fetcher
    );
    const { data: productsLength } = useSwr(`/api/products/length`, fetcher);

    const maxPageIndex = productsLength ? Math.ceil(productsLength / size) : pageIndex;

    useEffect(() => {
        function runPreload() {
            if (pageIndex < maxPageIndex) {
                preload(
                    `/api/products?sort=${sort}&pageIndex=${pageIndex + 1}&size=${size}`,
                    fetcher
                );
            }
        }
        runPreload();
    }, [pageIndex, maxPageIndex, size, sort]);

    const setSort = (value: SortOption) => {
        router.push(`/?page=1&size=${size}&sort=${value}`);
    };
    const setPageIndex = (value: number) => {
        router.push(`/?page=${value}&size=${size}&sort=${sort}`);
    };

    return (
        <ProductsLayout sort={sort} setSort={setSort}>
            <PaginationButtons
                currentPageIndex={pageIndex}
                setCurrentPageIndex={setPageIndex}
                maxPageIndex={maxPageIndex}
                isTop
            />
            <ProductsList products={products} error={error} isLoading={isLoading} />
            <PaginationButtons
                currentPageIndex={pageIndex}
                setCurrentPageIndex={setPageIndex}
                maxPageIndex={maxPageIndex}
            />
        </ProductsLayout>
    );
}
