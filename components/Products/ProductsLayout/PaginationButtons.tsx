type Props = {
    currentPageIndex: number;
    setCurrentPageIndex: (n: number) => void;
    maxPageIndex: number;
};
export default function PaginationButtons({
    currentPageIndex,
    setCurrentPageIndex,
    maxPageIndex
}: Props) {
    return (
        <div className="flex items-center justify-center border-t border-base-300 bg-base-100 px-4 py-3 sm:px-6">
            <div>
                <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
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
                        onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
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
