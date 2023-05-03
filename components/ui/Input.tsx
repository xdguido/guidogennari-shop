/* eslint-disable react/prop-types */
import clsx from 'clsx';

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    register: object;
    error: string | null;
    className?: string;
};
export default function Input({
    name,
    label,
    placeholder,
    type,
    register,
    error,
    className
}: Props) {
    return (
        <div className="mb-2">
            <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-600">
                {label}
            </label>
            <input
                className={clsx([
                    'form-control block w-full border border-solid bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:ring-2',
                    error ? 'border-red-300 ring ring-red-300' : 'border-gray-300',
                    'm-0 rounded-md transition ease-in-out focus:border-sky-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-sky-300',
                    className
                ])}
                name={name}
                placeholder={placeholder}
                type={type}
                {...register}
            />
            {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
        </div>
    );
}
