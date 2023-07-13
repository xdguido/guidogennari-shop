/* eslint-disable react/prop-types */
import Layout from '../components/Layout';
import Button from '@ui/Button';
// import { SWRConfig, unstable_serialize } from 'swr';
import { GetStaticProps } from 'next';
import CategoryProvider from '@lib/store/CategoryContext';
import categoryServices from '@lib/api/services/category.services';

export const getStaticProps: GetStaticProps = async () => {
    // `getStaticProps` is executed on the server side.

    const categoryTree = await categoryServices.getTree();

    return {
        props: {
            categoryData: JSON.parse(JSON.stringify(categoryTree))
        },
        revalidate: 60 * 60 * 24
    };
};

export default function Index({ categoryData }) {
    return (
        <CategoryProvider data={categoryData}>
            <Layout>
                <Button href="/products">Go to Products</Button>
            </Layout>
        </CategoryProvider>
    );
}
