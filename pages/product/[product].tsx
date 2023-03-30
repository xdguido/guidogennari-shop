/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import type { CategoryWithChildren } from '@lib/getProducts';
import getCategories from '@lib/getCategories';
import getProduct from '@lib/getProduct';
import Layout from '@components/Layout';
import Product from '@components/Product';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // `getStaticProps` is executed on the server side.
    const product = params?.product;

    const categoryTree: CategoryWithChildren[] = await getCategories();
    const data = await getProduct(product as string);

    if (!data) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            product,
            categoryTree,
            fallback: {
                [unstable_serialize(`/api/product/${product}`)]: JSON.parse(JSON.stringify(data))
            }
        },
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // Other pages will be prerendered at runtime.
        paths: [{ params: { product: 'chest-of-drawers-and-drawer-units-example-30ff' } }],
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Index({ fallback, product, categoryTree }) {
    return (
        <Layout categoryTree={categoryTree}>
            <SWRConfig value={{ fallback }}>
                <Product product={product} />
            </SWRConfig>
        </Layout>
    );
}
