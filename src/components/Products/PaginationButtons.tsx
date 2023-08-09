import Button from '~/components/ui/Button';
import clsx from 'clsx';
type Props = {
    currentPageIndex: number;
    sort?: string;
    categorySlug: string;
    maxPageIndex: number;
    basePath: string;
};
export default function PaginationButtons({
    currentPageIndex,
    maxPageIndex,
    sort = 'newest',
    categorySlug,
    basePath
}: Props) {
    return (
        <div className={'px-4 py-3 sm:px-6'}>
            <nav className="flex items-center justify-center " aria-label="Pagination">
                <Button
                    href={`${basePath}/${categorySlug}/${sort}/${currentPageIndex - 1}`}
                    className={clsx(
                        'btn-outline no-animation btn-sm normal-case',
                        currentPageIndex === 1 ? 'btn-disabled' : ''
                    )}
                >
                    Previous
                </Button>
                <div className="flex items-center gap-2 px-4 text-sm">
                    <span aria-current="page" className="font-semibold">
                        {currentPageIndex}
                    </span>
                    <span>
                        of <span className="font-medium">{maxPageIndex}</span>
                    </span>
                </div>
                <Button
                    href={`${basePath}/${categorySlug}/${sort}/${currentPageIndex + 1}`}
                    className={clsx(
                        'btn-outline no-animation btn-sm normal-case',
                        currentPageIndex === maxPageIndex ? 'btn-disabled' : ''
                    )}
                >
                    Next
                </Button>
            </nav>
        </div>
    );
}
