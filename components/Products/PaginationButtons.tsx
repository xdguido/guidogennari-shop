import Button from '@ui/Button';
import clsx from 'clsx';
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
        <div className={clsx('bg-base-100 px-4 py-3 sm:px-6')}>
            <nav className="flex items-center justify-center " aria-label="Pagination">
                <Button
                    href={`${basePath}/${category}/${sort}/${currentPageIndex - 1}`}
                    className={clsx('btn-outline btn-sm no-animation normal-case')}
                >
                    Previous
                </Button>
                <div className="flex items-center px-4 gap-2 text-sm">
                    <span aria-current="page" className="font-semibold">
                        {currentPageIndex}
                    </span>
                    <span>
                        of <span className="font-medium">{maxPageIndex}</span>
                    </span>
                </div>
                <Button
                    href={`${basePath}/${category}/${sort}/${currentPageIndex + 1}`}
                    className={clsx('btn-outline btn-sm no-animation normal-case')}
                >
                    Next
                </Button>
            </nav>
        </div>
    );
}
