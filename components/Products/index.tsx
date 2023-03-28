/* eslint-disable react/prop-types */
// import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';

import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products({ page, sort, category }) {
    // const router = useRouter();
    const size = 12;

    const { data } = useSwr(`/api/products/${category}/${sort}/${page}`, fetcher);

    const maxPageIndex = data?.total ? Math.ceil(data.total / size) : page;

    return (
        <ProductsLayout sort={sort} categoryNode={data.categoryNode}>
            {/* <PaginationButtons
                sort={sort}
                category={category}
                currentPageIndex={page}
                maxPageIndex={maxPageIndex}
                isTop
            /> */}
            <ProductsList products={data?.products} />
            <PaginationButtons
                sort={sort}
                category={category}
                currentPageIndex={page}
                maxPageIndex={maxPageIndex}
            />
        </ProductsLayout>
    );
}
