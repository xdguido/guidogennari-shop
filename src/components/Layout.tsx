import Header from './Header';
import Footer from './Footer';

export const siteTitle = 'Guido Gennari - Web Development';

export default function Layout({
    children,
    shop = true
}: {
    children: React.ReactNode;
    shop?: boolean;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-base-contrast text-base-content lg:bg-base-100">
            <Header shop={shop} />
            <main className="pt-4 lg:pt-10">{children}</main>
            <Footer />
        </div>
    );
}
