/* eslint-disable react/prop-types */

export default function Input({
    name,
    label,
    register,
    error,
    className,
    ...props
}: {
    name: string;
    label: string;
    register?: object;
    error?: string | null;
    className?: string;
} & React.HTMLProps<HTMLInputElement>) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="mb-1 block text-sm font-medium ">
                {label}
            </label>
            <input
                className={`m-0 block w-full rounded-md border border-solid bg-base-100 bg-clip-padding px-4 py-2 font-normal transition ease-in-out focus:border-base-contrast focus:outline-none focus:ring focus:ring-accent
                    ${error ? 'border-error' : 'border-neutral'}
                    ${className}`}
                autoComplete="off"
                name={name}
                {...register}
                {...props}
            />
            {error ? <p className="mt-2 text-xs text-error">{error}</p> : null}
        </div>
    );
}
