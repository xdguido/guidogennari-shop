/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import Layout from '@components/Layout';
import Products from '@components/Products';
import CategoryProvider from '@lib/store/CategoryContext';
import { SortOption } from '@lib/types';
import { productServices, categoryServices } from '@lib/api/services';

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

    const takeNumber = 12;

    const data = await productServices.getFiltered(
        takeNumber,
        page,
        sort as SortOption,
        category as string
    );

    if (data?.count === 0) {
        return {
            notFound: true
        };
    }

    const categoryTree = await categoryServices.getTree();

    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            sort,
            page,
            category,
            fallback: {
                [unstable_serialize(`/api/category`)]: JSON.parse(JSON.stringify(categoryTree))
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

export default function Index({ fallback, data, sort, page, category }) {
    return (
        <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
            <CategoryProvider>
                <Layout>
                    <Products data={data} page={page} sort={sort} categorySlug={category} />
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
