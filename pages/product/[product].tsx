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

    const productData = await productServices.getOne(productSlug as string);

    if (!productData) {
        return {
            notFound: true
        };
    }

    const categorySlug = productData?.category?.slug;
    const recommendedData = await productServices.getFiltered(
        8,
        1,
        'newest' as SortOption,
        categorySlug
    );
    const categoryTree = await categoryServices.getTree();

    return {
        props: {
            productSlug,
            recommendedData: JSON.parse(JSON.stringify(recommendedData)),
            fallback: {
                [unstable_serialize(`/api/product/${productSlug}`)]: JSON.parse(
                    JSON.stringify(productData)
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

export default function Index({ fallback, productSlug, recommendedData }) {
    return (
        <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
            <CategoryProvider>
                <Layout>
                    <Product recommendedProducts={recommendedData} productSlug={productSlug} />
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
