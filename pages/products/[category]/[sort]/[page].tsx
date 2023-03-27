/* eslint-disable react/prop-types */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import getProducts from '@lib/getProducts';
import Layout from '@components/Layout';
import Products from '@components/Products';
import { SortOption } from '@types';

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    // `getStaticProps` is executed on the server side.
    const page = Number(params?.page) || 1;
    const sort = params?.sort || SortOption.CreatedAtDesc;
    const category = params?.category || 'all-products';

    if (!Object.values(SortOption).includes(sort as SortOption)) {
        return {
            notFound: true
        };
    }

    const data = await getProducts(page, sort as SortOption, category as string);

    if (!data?.products?.length) {
        return {
            notFound: true
        };
    }
    if (page === 1) {
        return {
            redirect: {
                destination: `/products/${category}/${sort}`,
                permanent: false
            }
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
        paths: Array.from({ length: 2 }).map((_, i) => ({
            params: {
                category: 'all-products',
                sort: SortOption.CreatedAtDesc,
                page: '' + (i + 2)
            }
        })),
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
