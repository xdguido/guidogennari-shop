import type { Product } from '@prisma/client';
import type { GetFilteredTypes } from '@lib/types';
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import PaginationButtons from '@components/Products/PaginationButtons';
import EditProduct from '../EditProduct';

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
            <div className="bg-base-100 mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:p-8">
                No products to display
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-12 gap-2 group p-3 font-bold text-accent text-sm">
                <p className="col-span-6 sm:col-span-9">Name</p>
                <p className="col-span-2 sm:col-span-1">Stock</p>
                <p className="col-span-3 sm:col-span-2 ">Price</p>
            </div>
            <div className="grid grid-cols-1 gap-2 auto-rows-min max-h-screen overflow-auto rounded-lg font-semibold text-sm">
                {products.map((product: Product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-12 gap-1 sm:gap-2 items-center group p-3 rounded-lg border border-neutral"
                    >
                        <EditProduct
                            product={product}
                            label={product.name}
                            className="text-left col-span-6 sm:col-span-9 leading-none"
                        />
                        <span className=" col-span-2 sm:col-span-1">{product.stock}</span>
                        <p className="col-span-3 sm:col-span-2  overflow-hidden truncate">
                            $ {product.price.toLocaleString('es')}
                        </p>
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
