import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import PaginationButtons from '@components/Products/PaginationButtons';
import Button from '@ui/Button';
import { EyeIcon } from '@heroicons/react/24/outline';
import EditProduct from '../ProductForm/EditProduct';

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
            <div className="grid grid-cols-12 gap-2 group p-3 font-bold text-accent text-sm">
                <p className="col-span-5 sm:col-span-6">Name</p>
                <p className="col-span-3 sm:col-span-2 ">Price</p>
                <p>Stock</p>
            </div>
            <div className="grid grid-cols-1 gap-2 auto-rows-min max-h-screen overflow-auto rounded-lg text-sm">
                {data.products.map((product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-12 gap-1 sm:gap-2 items-center group p-3 bg-slate-200 rounded-lg border border-neutral"
                    >
                        {/* <Button
                            href={`/admin/product/${product.slug}`}
                            className="btn-ghost btn-sm normal-case justify-start col-span-3 sm:col-span-4"
                        >
                            {product.name}
                        </Button> */}
                        <p className="col-span-5 sm:col-span-6 leading-none">{product.name}</p>
                        <p className="col-span-3 sm:col-span-2 font-semibold overflow-hidden truncate">
                            $ {product.price.toLocaleString('es')}
                        </p>
                        <span className="font-semibold col-span-2">{product.stock}</span>
                        <div className="flex justify-end gap-1 sm:gap-2 col-span-2">
                            {/* <Button className="btn-ghost btn-square btn-sm">
                                <EyeIcon className="h-4 w-4" />
                            </Button> */}
                            <EditProduct product={product} />
                        </div>
                    </div>
                ))}
            </div>
            <PaginationButtons
                basePath="/admin/products"
                category={category as string}
                currentPageIndex={currentPageIndex}
                maxPageIndex={maxPageIndex}
            />
        </>
    );
}

ProductsList.propTypes = {
    products: PropTypes.array,
    error: PropTypes.object,
    isLoading: PropTypes.bool
};
