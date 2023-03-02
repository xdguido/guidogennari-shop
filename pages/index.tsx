import type { User } from '@prisma/client';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import fetcher from '@lib/fetcher';
import Button from '@ui/Button';
import Layout from '../components/Layout';
import Products from '../components/Products';

export default function Index() {
    // const { data, error, isLoading } = useSwr<User[]>('/api/users', fetcher);
    // const { locale } = useRouter();

    return (
        <Layout>
            <Products />
        </Layout>
    );
}
