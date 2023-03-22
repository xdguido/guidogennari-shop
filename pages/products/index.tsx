/* eslint-disable react/prop-types */
import { GetStaticProps } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';
import getProducts from '@lib/getProducts';
import Layout from '@components/Layout';
import Products from '@components/Products';

export const getStaticProps: GetStaticProps = async () => {
    // `getStaticProps` is executed on the server side.
    const page = 1;
    const data = await getProducts(page);

    if (!data?.products?.length) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            page,
            fallback: {
                [unstable_serialize(`/api/products/${page}`)]: JSON.parse(JSON.stringify(data))
            }
        },
        revalidate: 60
    };
};

export default function Index({ fallback, page }) {
    return (
        <Layout>
            <SWRConfig value={{ fallback }}>
                <Products page={page} />
            </SWRConfig>
        </Layout>
    );
}
