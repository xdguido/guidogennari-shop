/* eslint-disable react/prop-types */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import Layout from '@components/Layout';
import Products from '@components/Products';
import CategoryProvider from '@lib/store/CategoryContext';
import { SortOption } from '@lib/types';
import { productServices, categoryServices } from '@lib/api/services';

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    // `getStaticProps` is executed on the server side.
    const page = Number(params?.page) || 1;
    const sort = params?.sort || SortOption.CreatedAtDesc;
    const category = params?.category || 'all-products';

    const takeNumber = 12;
    const skipNumber = page * takeNumber;

    if (!Object.values(SortOption).includes(sort as SortOption)) {
        return {
            notFound: true
        };
    }

    const categoryTree = await categoryServices.getTree();
    // const categoryNode = await categoryServices.getOne(category as string);
    // const categoryBranch = await categoryServices.getBranch(categoryNode);
    const data = await productServices.getFiltered(
        skipNumber,
        takeNumber,
        sort as SortOption,
        category as string
    );

    if (data?.count === 0) {
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
                ),
                [unstable_serialize(`/api/category`)]: JSON.parse(JSON.stringify(categoryTree))
            }
        },
        revalidate: 60 * 60 * 24
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
        <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
            <CategoryProvider>
                <Layout>
                    <Products page={page} sort={sort} category={category} />
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
