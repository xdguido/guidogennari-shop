import Header from './Header';
import Footer from './Footer';

export const siteTitle = 'Guido Gennari - Web Development';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
            <Header />
            <main className="flex flex-auto flex-col">{children}</main>
            <Footer />
        </div>
    );
}
