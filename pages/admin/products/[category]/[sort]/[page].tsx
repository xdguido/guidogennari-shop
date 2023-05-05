import DashboardLayout from '@components/Admin/DashboardLayout';
import Products from '@components/Admin/Products';
import withAuth from '@components/Admin/withAuth';

function Page() {
    return (
        <>
            <DashboardLayout>
                <Products />
            </DashboardLayout>
        </>
    );
}

export default withAuth(Page);
