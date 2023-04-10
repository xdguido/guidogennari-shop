/* eslint-disable react/prop-types */
// import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { NextSeo } from 'next-seo';

import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products({ page, sort, category }) {
    // const router = useRouter();
    const size = 12;

    const {
        data: { products, categoryNode, total }
    } = useSwr(`/api/products/${category}/${sort}/${page}`, fetcher);

    const maxPageIndex = total ? Math.ceil(total / size) : page;

    return (
        <>
            <NextSeo
                title={`${categoryNode.name} | E-commerce`}
                description={`Browse ${categoryNode.name} products`}
            />
            <ProductsLayout sort={sort} categoryNode={categoryNode}>
                <ProductsList products={products} />
                <PaginationButtons
                    sort={sort}
                    category={category}
                    currentPageIndex={page}
                    maxPageIndex={maxPageIndex}
                />
            </ProductsLayout>
        </>
    );
}
