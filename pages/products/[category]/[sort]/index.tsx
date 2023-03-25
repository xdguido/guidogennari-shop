/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import getProducts from '@lib/getProducts';
import Layout from '@components/Layout';
import Products from '@components/Products';
import { SortOption } from '@types';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // `getStaticProps` is executed on the server side.
    const page = 1;
    const sort = params?.sort || SortOption.CreatedAtDesc;
    const category = params?.category || 'all';
    const data = await getProducts(page, sort, category);

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
                )
            }
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // Other pages will be prerendered at runtime.
        paths: [
            {
                params: {
                    category: 'all',
                    sort: SortOption.CreatedAtDesc
                }
            },
            {
                params: {
                    category: 'all',
                    sort: SortOption.PriceAsc
                }
            },
            {
                params: {
                    category: 'all',
                    sort: SortOption.PriceDesc
                }
            }
        ],
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Index({ fallback, sort, page, category }) {
    return (
        <Layout>
            <SWRConfig value={{ fallback }}>
                <Products page={page} sort={sort} category={category} />
            </SWRConfig>
        </Layout>
    );
}
