import withAuth from '~/components/Admin/withAuth';
import DashboardLayout from '~/components/Admin/DashboardLayout';

function ProductPage() {
    return <DashboardLayout>Product</DashboardLayout>;
}

export default withAuth(ProductPage);
