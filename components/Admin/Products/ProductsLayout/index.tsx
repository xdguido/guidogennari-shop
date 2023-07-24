import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import type { CategoryNode } from '@lib/types';
import PropTypes from 'prop-types';
import Button from '@ui/Button';
import MobileMenu from './MobileMenu';
import AddProduct from '@components/Admin/AddProduct';

type Props = {
    children: React.ReactNode;
};
export default function ProductsList({ children }: Props) {
    const router = useRouter();
    const { category } = router.query;

    const { data: categoryTree, isLoading } = useSwr<CategoryNode[]>('/api/category', fetcher);

    if (isLoading) {
        return <span className="flex justify-center font-semibold">Loading...</span>;
    }

    return (
        <>
            <div className="mx-auto bg-base-100">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Products list</h1>

                <div className="flex items-center justify-between border-b border-base-300 pb-2 lg:justify-end">
                    <AddProduct />
                    <div className="flex gap-2 sm:gap-3">
                        <MobileMenu categoryTree={categoryTree} />
                    </div>
                </div>
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="hidden max-h-screen grid-cols-1 overflow-auto lg:grid">
                        {categoryTree.map((section) => (
                            <div key={section.name}>
                                <p id={`${section.name}-heading`} className="ml-3 font-medium ">
                                    {section.name}
                                </p>
                                <ul
                                    role="list"
                                    aria-labelledby={`${section.name}-heading`}
                                    className="mt-6 mb-6 space-y-2 sm:mt-4"
                                >
                                    <li className="flex">
                                        <Button
                                            href={`/admin/products/${section.slug}/newest/1`}
                                            className={clsx(
                                                'btn-ghost no-animation btn-block btn-sm justify-start normal-case hover:text-base-content',
                                                category === section.slug
                                                    ? 'pointer-events-none bg-primary-focus text-primary-content'
                                                    : 'text-neutral'
                                            )}
                                        >
                                            View all
                                        </Button>
                                    </li>
                                    {section.children.map((item) => (
                                        <li key={item.name} className="flex">
                                            <Button
                                                href={`/admin/products/${item.slug}/newest/1`}
                                                className={clsx(
                                                    'btn-ghost no-animation btn-block btn-sm justify-start text-left normal-case hover:text-base-content',
                                                    category === item.slug
                                                        ? 'pointer-events-none bg-primary-focus  text-primary-content'
                                                        : 'text-neutral'
                                                )}
                                            >
                                                {item.name}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-3">
                        {/* Products list */}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

ProductsList.propTypes = {
    products: PropTypes.array,
    error: PropTypes.object,
    isLoading: PropTypes.bool
};
