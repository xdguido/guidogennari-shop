/* eslint-disable react/prop-types */
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
    title: string;
    children: React.ReactNode;
} & React.ComponentProps<typeof Disclosure>;
export default function FormSection({ title, children, ...props }: Props) {
    return (
        <Disclosure as="div" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        as="div"
                        className={clsx(
                            'flex items-center justify-between rounded-md border p-3 font-medium',
                            !open && 'shadow-sm hover:shadow-md'
                        )}
                    >
                        {title}
                        <ChevronRightIcon
                            className={clsx(
                                'text-neutral h-5 w-5',
                                open && 'rotate-90 transform duration-100'
                            )}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel as="div" className="rounded p-3 shadow-sm">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
