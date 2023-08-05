import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import type { CategoryNode } from '@/types';
import PropTypes from 'prop-types';
import Button from '@ui/Button';
import MobileMenu from './MobileMenu';
import FormDialog from '@components/Admin/FormDialog';

export default function ProductsList({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { category } = router.query;
    const { data: categoryTree, isLoading } = useSwr<CategoryNode[]>('/api/category', fetcher);

    if (isLoading) {
        return <span className="flex justify-center font-semibold">Loading...</span>;
    }

    return (
        <>
            <div className="mx-auto rounded-lg border border-neutral bg-base-contrast p-2 lg:p-4">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="hidden max-h-[800px] grid-cols-1 overflow-auto lg:grid">
                        {categoryTree.map((section) => (
                            <div key={section.name}>
                                <p
                                    id={`${section.name}-heading`}
                                    className="ml-3 font-medium text-neutral"
                                >
                                    {section.name}
                                </p>
                                <ul
                                    role="list"
                                    aria-labelledby={`${section.name}-heading`}
                                    className="mt-6 mb-6 space-y-1 sm:mt-4"
                                >
                                    <li className="flex">
                                        <Button
                                            href={`/admin/products/${section.slug}/newest/1`}
                                            className={clsx(
                                                'btn-ghost no-animation btn-block btn-sm justify-start normal-case hover:text-base-content',
                                                category === section.slug
                                                    ? 'pointer-events-none text-info'
                                                    : ''
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
                                                        ? 'pointer-events-none text-info'
                                                        : ''
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
                    <div className="col-span-4">
                        <div className="flex items-center pb-2">
                            <FormDialog label="add product" className="btn-primary btn" />
                        </div>
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
