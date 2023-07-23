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
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Dashboard</h1>
            <section className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-6">
                    <div className="hidden lg:block">
                        <h3 className="mb-2 px-3 font-semibold text-base-content">Options</h3>
                        <ul role="list" className="space-y-2  pb-6 text-sm font-medium ">
                            {dashboardNav.map((link) => (
                                <li key={link.label}>
                                    <Button
                                        href={link.href}
                                        className={clsx(
                                            'btn-ghost no-animation btn-block btn-sm justify-start normal-case hover:text-base-content',
                                            router.asPath.includes(link.href)
                                                ? 'pointer-events-none bg-primary-focus  text-primary-content'
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
