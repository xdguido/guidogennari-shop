/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import type { CategoryWithChildren } from '@lib/getProducts';
import getCategories from '@lib/getCategories';
import getProduct from '@lib/getProduct';
import Layout from '@components/Layout';
import Product from '@components/Product';
import getProducts from '@lib/getProducts';
import { SortOption } from '@types';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // `getStaticProps` is executed on the server side.
    const productSlug = params?.product;

    const categoryTree: CategoryWithChildren[] = await getCategories();
    const productData = await getProduct(productSlug as string);
    const productCategory = productData?.category[0]?.slug;
    const productsData = await getProducts(1, 'newest' as SortOption, productCategory);

    if (!productData || !productsData) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            productSlug,
            categorySlug: productCategory,
            categoryTree,
            fallback: {
                [unstable_serialize(`/api/product/${productSlug}`)]: JSON.parse(
                    JSON.stringify(productData)
                ),
                [unstable_serialize(`/api/products/${productCategory}/newest/1`)]: JSON.parse(
                    JSON.stringify(productsData)
                )
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

export default function Index({ fallback, productSlug, categorySlug, categoryTree }) {
    return (
        <Layout categoryTree={categoryTree}>
            <SWRConfig value={{ fallback }}>
                <Product productSlug={productSlug} categorySlug={categorySlug} />
            </SWRConfig>
        </Layout>
    );
}
