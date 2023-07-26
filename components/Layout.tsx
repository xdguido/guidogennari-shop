import Header from './Header';
import Footer from './Footer';

export const siteTitle = 'Guido Gennari - Web Development';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-base-contrast text-base-content lg:bg-base-100">
            <Header />
            <main className="pt-4 lg:pt-10">{children}</main>
            <Footer />
        </div>
    );
}
