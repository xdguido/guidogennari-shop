import Header from './Header';
import Footer from './Footer';
import { CategoryWithChildren } from '@lib/getProducts';

export const siteTitle = 'Guido Gennari - Web Development';

type Props = {
    categoryTree: CategoryWithChildren[];
    children: React.ReactNode;
};

export default function Layout({ children, categoryTree }: Props) {
    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
            <Header categoryTree={categoryTree} />
            <main className="flex flex-auto flex-col pt-32">{children}</main>
            <Footer categoryTree={categoryTree} />
        </div>
    );
}
