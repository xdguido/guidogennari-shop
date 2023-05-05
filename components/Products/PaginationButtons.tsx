import clsx from 'clsx';
import Link from 'next/link';
type Props = {
    currentPageIndex: number;
    sort?: string;
    category: string;
    maxPageIndex: number;
    basePath: string;
};
export default function PaginationButtons({
    currentPageIndex,
    maxPageIndex,
    sort = 'newest',
    category,
    basePath
}: Props) {
    return (
        <div className={clsx('flex items-center justify-center bg-base-100 px-4 py-3 sm:px-6')}>
            <div>
                <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
                    <Link
                        href={`${basePath}/${category}/${sort}/${currentPageIndex - 1}`}
                        className={clsx(
                            'relative inline-flex items-center rounded-md border border-base-content  px-4 py-2 text-sm font-medium bg-base-100',
                            currentPageIndex === 1
                                ? 'text-neutral border-neutral pointer-events-none'
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
                        href={`${basePath}/${category}/${sort}/${currentPageIndex + 1}`}
                        className={clsx(
                            'relative inline-flex items-center rounded-md border border-base-content  px-4 py-2 text-sm font-medium bg-base-100',
                            currentPageIndex === maxPageIndex
                                ? 'text-neutral border-neutral pointer-events-none'
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
