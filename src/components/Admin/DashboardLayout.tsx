import PopoverMenu from '~/components/Header/PopoverMenu';
import MobileMenu from '~/components/Header/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // const router = useRouter();
    // const dashboardNav = [
    //     { href: '/admin/dashboard', label: 'Dashboard' },
    //     { href: '/admin/orders', label: 'Orders list' },
    //     {
    //         href: '/admin/products',
    //         label: 'Products list'
    //     }
    // ];
    return (
        <div className="mx-auto max-w-[1600px] px-2">
            <header className="flex h-16 items-center justify-between lg:h-20">
                <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                <PopoverMenu />
                <MobileMenu />
            </header>
            <section>{children}</section>
        </div>
    );
}
