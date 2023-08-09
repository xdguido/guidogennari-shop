import type { Product } from '@prisma/client';
import type { GetFilteredTypes } from '~/types';
import fetcher from '~/lib/fetcher';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import PaginationButtons from '~/components/Products/PaginationButtons';
import FormDialog from '../FormDialog';

export default function ProductsList() {
    const router = useRouter();
    const { category, page } = router.query;
    const size = 12;
    const { data } = useSwr<GetFilteredTypes>(`/api/products/${category}/newest/${page}`, fetcher);

    if (!data) {
        return <span className="flex justify-center font-semibold">Loading...</span>;
    }

    const { products, count } = data;
    const currentPageIndex = Number(page);
    const maxPageIndex = count ? Math.ceil(count / size) : currentPageIndex;

    if (products?.length == 0) {
        return (
            <div className="mx-auto max-w-2xl bg-base-100 p-4 sm:p-6 lg:max-w-7xl lg:p-8">
                No products to display
            </div>
        );
    }

    return (
        <>
            <div className="group grid grid-cols-12 gap-2 p-3 text-sm font-bold text-primary">
                <p className="col-span-6 sm:col-span-9">Name</p>
                <p className="col-span-2 sm:col-span-1">Stock</p>
                <p className="col-span-3 sm:col-span-2 ">Price</p>
            </div>
            <div className="grid max-h-screen auto-rows-min grid-cols-1 overflow-auto rounded-lg border border-neutral text-sm font-semibold">
                {products.map((product: Product) => (
                    <div
                        key={product.id}
                        className="group grid grid-cols-12 items-center gap-1 border-b border-neutral p-3 sm:gap-2 lg:p-4"
                    >
                        <FormDialog
                            type="update"
                            product={product}
                            label={product.name}
                            className="col-span-6 text-left leading-none sm:col-span-9"
                        />
                        <span className=" col-span-2 sm:col-span-1">{product.stock}</span>
                        <p className="col-span-3 overflow-hidden  truncate sm:col-span-2">
                            $ {product.price.toLocaleString('es')}
                        </p>
                    </div>
                ))}
            </div>
            <PaginationButtons
                basePath="/admin/products"
                categorySlug={category as string}
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
