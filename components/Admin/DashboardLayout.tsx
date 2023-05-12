import { useRouter } from 'next/router';
import clsx from 'clsx';
import Button from '@ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dashboardNav = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/orders', label: 'Orders list' },
        {
            href: '/admin/products',
            label: 'Products list'
        }
    ];
    return (
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Dashboard</h1>
            <section className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-6">
                    <div className="hidden lg:block">
                        <h3 className="text-base-content font-semibold mb-2 px-3">Options</h3>
                        <ul role="list" className="pb-6  space-y-2 text-sm font-medium ">
                            {dashboardNav.map((link) => (
                                <li key={link.label}>
                                    <Button
                                        href={link.href}
                                        className={clsx(
                                            'btn-ghost btn-sm no-animation normal-case btn-block justify-start hover:text-base-content',
                                            router.asPath.includes(link.href)
                                                ? 'pointer-events-none text-primary-content  bg-primary-focus'
                                                : 'text-neutral'
                                        )}
                                    >
                                        {link.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-5">{children}</div>
                </div>
            </section>
        </div>
    );
}
