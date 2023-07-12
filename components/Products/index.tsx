/* eslint-disable react/prop-types */
// import { useRouter } from 'next/router';
import type { GetFilteredTypes } from '@lib/types';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { NextSeo } from 'next-seo';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

export default function Products({ page, sort, category }) {
    const {
        data: { products, categoryNode, count }
    } = useSwr<GetFilteredTypes>(`/api/products/${category}/${sort}/${page}`, fetcher);

    const size = 12;
    const maxPageIndex = count ? Math.ceil(count / size) : page;

    return (
        <>
            <NextSeo
                title={`${categoryNode.name} | E-commerce`}
                description={`Browse ${categoryNode.name} products`}
            />
            <ProductsLayout sort={sort} categoryNode={categoryNode} totalProducts={count}>
                <ProductsList products={products} />
                <PaginationButtons
                    basePath="/products"
                    sort={sort}
                    category={category}
                    currentPageIndex={page}
                    maxPageIndex={maxPageIndex}
                />
            </ProductsLayout>
        </>
    );
}
