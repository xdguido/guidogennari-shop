/* eslint-disable react/prop-types */
import type { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';

import { SortOption } from '@types';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products({ page, sort }) {
    // const router = useRouter();
    const size = 12;

    const { data } = useSwr(`/api/products/${sort}/${page}`, fetcher);

    const maxPageIndex = data?.total ? Math.ceil(data.total / size) : page;

    return (
        <ProductsLayout sort={sort}>
            <PaginationButtons
                sort={sort}
                currentPageIndex={page}
                maxPageIndex={maxPageIndex}
                isTop
            />
            <ProductsList products={data?.products} />
            <PaginationButtons sort={sort} currentPageIndex={page} maxPageIndex={maxPageIndex} />
        </ProductsLayout>
    );
}
