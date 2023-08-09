import Dashboard from '~/components/Admin';
import withAuth from '~/components/Admin/withAuth';

function Page() {
    return <Dashboard />;
}

export default withAuth(Page);
