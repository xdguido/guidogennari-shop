import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import PaginationButtons from '@components/Products/PaginationButtons';

export default function ProductsList() {
    const router = useRouter();
    const { category, page } = router.query;

    const size = 12;
    const { data, isLoading } = useSwr(`/api/products/${category}/newest/${page}`, fetcher);

    if (isLoading) {
        return <span className="flex justify-center font-semibold">Loading...</span>;
    }

    const currentPageIndex = Number(page);
    const maxPageIndex = data.total ? Math.ceil(data.total / size) : currentPageIndex;

    if (data.products?.length == 0) {
        return (
            <div className="bg-base-100 mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:p-8">
                No products to display
            </div>
        );
    }
    return (
        <>
            <div className="grid grid-cols-6 gap-2 group p-3 font-bold text-accent">
                <h1 className="col-span-3 sm:col-span-4">Name</h1>
                <h1 className="col-span-2 sm:col-span-1">Price</h1>
                <h1>Stock</h1>
            </div>
            <div className="grid grid-cols-1 gap-2 auto-rows-min max-h-screen overflow-auto p-1 rounded-lg">
                {data.products.map((product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-6 gap-2 group p-3 rounded-lg border border-neutral"
                    >
                        <Link
                            href={`/admin/product/${product.slug}`}
                            className=" cursor-pointer col-span-3 sm:col-span-4"
                        >
                            {product.name}
                        </Link>
                        <p className="col-span-2 sm:col-span-1 overflow-hidden truncate">
                            {product.price.toLocaleString('es')}
                        </p>
                        <span>{product.stock}</span>
                    </div>
                ))}
                <PaginationButtons
                    basePath="/admin/products"
                    category={category as string}
                    currentPageIndex={currentPageIndex}
                    maxPageIndex={maxPageIndex}
                />
            </div>
        </>
    );
}

ProductsList.propTypes = {
    products: PropTypes.array,
    error: PropTypes.object,
    isLoading: PropTypes.bool
};
