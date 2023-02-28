import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';

export default function UserPage() {
    const { query, locale } = useRouter();
    const { data, error, isLoading } = useSwr<User>(
        query.id ? `/api/user/${query.id}` : null,
        fetcher
    );

    switch (locale) {
        case 'es':
            if (error) return <div>Error al cargar usuario: {error.clientString.es}</div>;
            if (isLoading) return <div>Cargando...</div>;
            if (!data) return null;

            return <div>{data.name}</div>;
        default:
            if (error) return <div>Failed to load user: {error.clientString.en}</div>;
            if (isLoading) return <div>Loading...</div>;
            if (!data) return null;

            return <div>{data.name}</div>;
    }
}
