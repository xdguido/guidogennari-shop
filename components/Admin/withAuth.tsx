import { useSession } from 'next-auth/react';

export default function withAuth(WrappedComponent) {
    return function WithAuth(props) {
        const { data: session, status } = useSession({ required: true });

        if (status === 'loading') {
            return <p>Loading...</p>;
        }

        if (session?.user?.role !== 'admin') {
            return <p>Not admin</p>;
        }

        return <WrappedComponent {...props} />;
    };
}
