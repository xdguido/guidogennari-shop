/* eslint-disable react/prop-types */
import clsx from 'clsx';

type Props = {
    name: string;
    label: string;
    register?: object;
    error?: string | null;
    className?: string;
} & React.HTMLProps<HTMLInputElement>;
export default function Input({ name, label, register, error, className, ...props }: Props) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="mb-1 block text-sm font-medium ">
                {label}
            </label>
            <input
                className={clsx([
                    'block w-full border border-solid bg-base-100 bg-clip-padding px-4 py-2 font-normal focus:ring-2',
                    error ? 'border-error' : 'border-neutral',
                    'm-0 rounded-md transition ease-in-out focus:border-accent  focus:outline-none focus:ring-accent',
                    className
                ])}
                autoComplete="off"
                name={name}
                {...register}
                {...props}
            />
            {error ? <p className="mt-2 text-xs text-error">{error}</p> : null}
        </div>
    );
}
