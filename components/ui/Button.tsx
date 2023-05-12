import Link from 'next/link';

interface ButtonProps {
    className?: string;
    href?: string;
    as?: string;
    type?: 'button' | 'reset' | 'submit';
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
    target?: string;
    rel?: string;
}

export default function Button({ className, children, onClick, href, as, type }: ButtonProps) {
    return href ? (
        <Link href={href} as={as} className={`btn ${className}`}>
            {children}
        </Link>
    ) : (
        <button onClick={onClick} type={type} className={`btn ${className}`}>
            {children}
        </button>
    );
}
