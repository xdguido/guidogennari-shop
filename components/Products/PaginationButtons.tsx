import clsx from 'clsx';
import Link from 'next/link';
type Props = {
    currentPageIndex: number;
    runPreload?: () => void;
    maxPageIndex: number;
    isTop?: boolean;
};
export default function PaginationButtons({
    currentPageIndex,
    maxPageIndex,
    isTop = false
}: Props) {
    return (
        <div
            className={clsx(
                'flex items-center justify-center border-base-300 bg-base-100 px-4 py-3 sm:px-6',
                isTop ? '' : 'border-t'
            )}
        >
            <div>
                <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
                    <Link
                        href={`/products/${currentPageIndex - 1}`}
                        className={clsx(
                            'relative inline-flex items-center rounded-md border border-base-300  px-4 py-2 text-sm font-medium bg-base-100',
                            currentPageIndex === 1
                                ? 'text-base-300 pointer-events-none'
                                : 'hover:bg-base-200'
                        )}
                    >
                        Previous
                    </Link>
                    <div className="flex items-center px-4 gap-2">
                        <span
                            aria-current="page"
                            className="rounded-md bg-base-200 px-4 py-2 text-sm font-semibold"
                        >
                            {currentPageIndex}
                        </span>
                        <span className="text-sm ">
                            of <span className="font-medium">{maxPageIndex}</span>
                        </span>
                    </div>
                    <Link
                        href={`/products/${currentPageIndex + 1}`}
                        className={clsx(
                            'relative inline-flex items-center rounded-md border border-base-300  px-4 py-2 text-sm font-medium bg-base-100',
                            currentPageIndex === maxPageIndex
                                ? 'text-base-300 pointer-events-none'
                                : 'hover:bg-base-200'
                        )}
                    >
                        Next
                    </Link>
                </nav>
            </div>
        </div>
    );
}
