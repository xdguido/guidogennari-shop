/* eslint-disable react/prop-types */
import { GetStaticProps, GetStaticPaths } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import Layout from '@components/Layout';
import Product from '@components/Product';
import { SortOption } from '@lib/types';
import CategoryProvider from '@lib/store/CategoryContext';
import categoryServices from '@lib/api/services/category.services';
import { productServices } from '@lib/api/services';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // `getStaticProps` is executed on the server side.
    const productSlug = params?.product;

    const categoryTree = await categoryServices.getTree();
    const productData = await productServices.getOne(productSlug as string);
    const productCategory = productData?.category?.slug;

    const suggestedProducts = await productServices.getFiltered(
        0,
        8,
        'newest' as SortOption,
        productCategory
    );

    if (!productData) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            productSlug,
            categorySlug: productCategory,
            fallback: {
                [unstable_serialize(`/api/product/${productSlug}`)]: JSON.parse(
                    JSON.stringify(productData)
                ),
                [unstable_serialize(`/api/products/${productCategory}/newest/1`)]: JSON.parse(
                    JSON.stringify(suggestedProducts)
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
        paths: [],
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Index({ fallback, productSlug, categorySlug }) {
    return (
        <SWRConfig value={{ fallback }}>
            <CategoryProvider>
                <Layout>
                    <Product productSlug={productSlug} categorySlug={categorySlug} />
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
