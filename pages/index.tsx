/* eslint-disable react/prop-types */
import Layout from '../components/Layout';
import Button from '@ui/Button';

import { GetStaticProps } from 'next';
import type { CategoryWithChildren } from '@lib/getProducts';
import getCategories from '@lib/getCategories';

export const getStaticProps: GetStaticProps = async () => {
    // `getStaticProps` is executed on the server side.

    const categoryTree: CategoryWithChildren[] = await getCategories();

    return {
        props: {
            categoryTree
        },
        revalidate: 60
    };
};

export default function Index({ categoryTree }) {
    return (
        <Layout categoryTree={categoryTree}>
            <Button href="/products">Go to Products</Button>
        </Layout>
    );
}
