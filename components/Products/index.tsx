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

export default function Products({ page }) {
    // const router = useRouter();
    const [sort, setSort] = useState(SortOption.CreatedAtDesc);
    const size = 12;

    const { data } = useSwr(`/api/products/${page}`, fetcher);

    const maxPageIndex = data?.total ? Math.ceil(data.total / size) : page;

    return (
        <ProductsLayout sort={sort} setSort={setSort}>
            <PaginationButtons currentPageIndex={page} maxPageIndex={maxPageIndex} isTop />
            <ProductsList products={data?.products} />
            <PaginationButtons currentPageIndex={page} maxPageIndex={maxPageIndex} />
        </ProductsLayout>
    );
}
