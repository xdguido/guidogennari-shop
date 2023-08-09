import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({
    className,
    ...props
}: { className?: string } & React.HTMLProps<HTMLInputElement>) {
    return (
        <div className="relative">
            <input
                className={` pointer-events-none block w-full rounded-md border border-solid bg-base-100 bg-clip-padding px-4 py-2 font-normal transition ease-in-out focus:border-base-contrast focus:outline-none focus:ring focus:ring-accent
                     ${false ? 'border-error' : 'border-neutral'}
                     ${className}`}
                placeholder="Search"
                autoComplete="off"
                {...props}
            />
            <MagnifyingGlassIcon className="absolute right-4 top-3 h-5 w-5 text-neutral" />
        </div>
    );
}
