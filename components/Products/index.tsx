/* eslint-disable react/prop-types */
import type { GetFilteredTypes, SortOption } from '@lib/types';
import { NextSeo } from 'next-seo';
import ProductsLayout from './ProductsLayout';
import ProductsList from './ProductsList';
import PaginationButtons from './PaginationButtons';

type Props = {
    data: GetFilteredTypes;
    page: number;
    sort: SortOption;
    categorySlug: string;
};
export default function Products({ data, page, sort, categorySlug }: Props) {
    const { products, categoryNode, count } = data;
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
                    categorySlug={categorySlug}
                    currentPageIndex={page}
                    maxPageIndex={maxPageIndex}
                />
            </ProductsLayout>
        </>
    );
}
