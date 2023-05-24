/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import getProducts from '@lib/getProducts';
import type { CategoryWithChildren } from '@lib/getProducts';
import getCategories from '@lib/getCategories';
import Layout from '@components/Layout';
import Products from '@components/Products';
import CategoryProvider from '@store/CategoryContext';
import { SortOption } from '@types';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // `getStaticProps` is executed on the server side.
    const page = 1;
    const sort = params?.sort || SortOption.CreatedAtDesc;
    const category = params?.category || 'all-products';

    if (!Object.values(SortOption).includes(sort as SortOption)) {
        return {
            notFound: true
        };
    }

    const categoryTree: CategoryWithChildren[] = await getCategories();
    const data = await getProducts(page, sort as SortOption, category as string);

    if (!data?.products?.length) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            category,
            sort,
            page,
            fallback: {
                [unstable_serialize(`/api/products/${category}/${sort}/${page}`)]: JSON.parse(
                    JSON.stringify(data)
                ),
                [unstable_serialize(`/api/categories`)]: JSON.parse(JSON.stringify(categoryTree))
            }
        },
        revalidate: 60 * 60 * 24
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // Other pages will be prerendered at runtime.
        paths: [],
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Index({ fallback, sort, page, category }) {
    return (
        <SWRConfig value={{ fallback }}>
            <CategoryProvider>
                <Layout>
                    <Products page={page} sort={sort} category={category} />
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
