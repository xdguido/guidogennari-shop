import Header from './header';

export const siteTitle = 'Guido Gennari - Web Development';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black dark:text-gray-100">
            <Header />
            <main className="flex flex-auto flex-col">{children}</main>
            <footer className="flex items-center justify-between bg-black dark:bg-gray-300 h-[8rem] p-4 lg:p-5">
                <h1 className="font-neue text-white dark:text-gray-900 leading-6 tracking-tight text-xl">
                    Guido
                    <br />
                    Gennari
                </h1>
            </footer>
        </div>
    );
}
