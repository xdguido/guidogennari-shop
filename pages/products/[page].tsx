/* eslint-disable react/prop-types */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import getProducts from '@lib/getProducts';
import Layout from '@components/Layout';
import Products from '@components/Products';

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    // `getStaticProps` is executed on the server side.
    const page = Number(params?.page) || 1;
    // const category = params?.category || 'new_arrivals';
    const data = await getProducts(page);

    if (!data.total) {
        return {
            notFound: true
        };
    }
    // Redirect the first page to `/category` to avoid duplicated content
    // if (page === 1) {
    //     return {
    //         redirect: {
    //             destination: `/products`,
    //             permanent: false
    //         }
    //     };
    // }
    return {
        props: {
            // category,
            page,
            fallback: {
                [unstable_serialize([`/api/products/${page}`])]: JSON.parse(JSON.stringify(data))
            }
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    // const allCategories = ['new_arrivals', 'brands', 'accessories'];
    // const categoryPaginationPaths = allCategories.flatMap((category) => {
    //     // Prerender the next 3 pages after the first page, which is handled by the index page.
    //     const pages = Array.from({ length: 3 }).map((_, i) => i + 1);
    //     return pages.map((page) => ({
    //         params: {
    //             category,
    //             page: page.toString()
    //         }
    //     }));
    // });
    return {
        // Other pages will be prerendered at runtime.
        paths: Array.from({ length: 4 }).map((_, i) => ({
            params: {
                page: '' + (i + 2)
            }
        })),
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Index({ fallback, category, page }) {
    return (
        <Layout>
            <SWRConfig value={{ fallback }}>
                <Products category={category} page={page} />
            </SWRConfig>
        </Layout>
    );
}
