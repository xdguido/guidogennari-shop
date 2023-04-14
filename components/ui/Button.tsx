import Link from 'next/link';
// import { cva, VariantProps } from 'class-variance-authority';

// const buttonStyles = cva(
//     [
//         'btn'
//         // 'flex items-center justify-center gap-2 px-6 py-2.5 font-medium leading-tight rounded-md lg:text-lg',
//         // 'focus:outline-none focus-visible:ring-offset-2 focus-visible:ring-2',
//         // 'transition duration-150 ease-in-out'
//     ],
//     {
//         variants: {},
//         defaultVariants: {},
//         compoundVariants: []
//     }
// );

interface ButtonProps {
    className?: string;
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
    target?: string;
    rel?: string;
}

// export interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

export default function Button({ className, children, onClick, href }: ButtonProps) {
    return href ? (
        <Link
            href={href}
            className={`btn ${className}`} /* className={`${buttonStyles({})} ${className}` }*/
        >
            {children}
        </Link>
    ) : (
        <button
            onClick={onClick}
            className={`btn ${className}`} /* className={`${buttonStyles({})} ${className}` }*/
        >
            {children}
        </button>
    );
}
