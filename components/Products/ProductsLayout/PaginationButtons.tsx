import clsx from 'clsx';
type Props = {
    currentPageIndex: number;
    setCurrentPageIndex: (n: number) => void;
    maxPageIndex: number;
    isTop?: boolean;
};
export default function PaginationButtons({
    currentPageIndex,
    setCurrentPageIndex,
    maxPageIndex,
    isTop = false
}: Props) {
    const isBrowser = () => typeof window !== 'undefined';
    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0 });
    }
    return (
        <div
            className={clsx(
                'flex items-center justify-center border-base-300 bg-base-100 px-4 py-3 sm:px-6',
                isTop ? '' : 'border-t'
            )}
        >
            <div>
                <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => {
                            setCurrentPageIndex(currentPageIndex - 1);
                            isTop ? null : scrollToTop();
                        }}
                        className="relative inline-flex items-center rounded-md border border-base-300  px-4 py-2 text-sm font-medium bg-base-100  enabled:hover:bg-base-200 disabled:text-base-300"
                        disabled={currentPageIndex === 1}
                    >
                        Previous
                    </button>
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
                    <button
                        onClick={() => {
                            setCurrentPageIndex(currentPageIndex + 1);
                            isTop ? null : scrollToTop();
                        }}
                        className="relative ml-3 inline-flex items-center rounded-md border border-base-300  px-4 py-2 text-sm font-medium bg-base-100 enabled:hover:bg-base-200 disabled:text-base-300"
                        disabled={currentPageIndex === maxPageIndex}
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
}
