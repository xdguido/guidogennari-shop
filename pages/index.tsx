import type { User } from '@prisma/client';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import fetcher from '@lib/fetcher';
import Button from '@ui/Button';
import Header from '../components/header';

export default function Index() {
    const { data, error, isLoading } = useSwr<User[]>('/api/users', fetcher);
    const { locale } = useRouter();

    return (
        <>
            <Header />
            <div className="pt-16 p-10 bg-base-300 text-base-content">
                <button className="btn">button</button>
                <button className="btn btn-primary">button</button>
                <button className="btn btn-secondary">button</button>
                <button className="btn btn-accent">button</button>
                <Button className="btn-primary">my button</Button>
            </div>
        </>
    );

    // switch (locale) {
    //     case 'es':
    //         if (error) return <div>Error al cargar usuarios: {error.clientString.es}</div>;
    //         if (isLoading) return <div>Cargando...</div>;
    //         if (!data) return null;

    //         return (
    //             <ul>
    //                 {data.map((user) => (
    //                     <li key={user.id}>
    //                         <Link href="/user/[id]" as={`/user/${user.id}`}>
    //                             {user.name ?? `Usuario ${user.id}`}
    //                         </Link>
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    //     default:
    //         if (error) return <div>Failed to load users: {error.clientString.en}</div>;
    //         if (isLoading) return <div>Loading...</div>;
    //         if (!data) return null;

    //         return (
    //             <ul>
    //                 {data.map((user) => (
    //                     <li key={user.id}>
    //                         <Link href="/user/[id]" as={`/user/${user.id}`}>
    //                             {user.name ?? `User ${user.id}`}
    //                         </Link>
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    // }
}
