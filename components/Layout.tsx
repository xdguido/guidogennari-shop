import Header from './Header';
import Footer from './Footer';

export const siteTitle = 'Guido Gennari - Web Development';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
            <Header />
            <main className="flex flex-auto flex-col pt-10">{children}</main>
            <Footer />
        </div>
    );
}
