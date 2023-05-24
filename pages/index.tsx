/* eslint-disable react/prop-types */
import Layout from '../components/Layout';
import Button from '@ui/Button';

import { SWRConfig, unstable_serialize } from 'swr';
import { GetStaticProps } from 'next';
import type { CategoryWithChildren } from '@lib/getProducts';
import getCategories from '@lib/getCategories';
import CategoryProvider from '@store/CategoryContext';

export const getStaticProps: GetStaticProps = async () => {
    // `getStaticProps` is executed on the server side.

    const categoryTree: CategoryWithChildren[] = await getCategories();

    return {
        props: {
            fallback: {
                [unstable_serialize(`/api/categories`)]: JSON.parse(JSON.stringify(categoryTree))
            }
        },
        revalidate: 60 * 60
    };
};

export default function Index({ fallback }) {
    return (
        <SWRConfig value={{ fallback }}>
            <CategoryProvider>
                <Layout>
                    <Button href="/products">Go to Products</Button>
                </Layout>
            </CategoryProvider>
        </SWRConfig>
    );
}
