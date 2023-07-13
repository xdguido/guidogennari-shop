import Link, { LinkProps } from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAndLinkProps = ButtonProps | LinkButtonProps;

export default function Button(props: ButtonAndLinkProps) {
    if ('href' in props) {
        const { className, href, children, ...otherProps } = props as LinkButtonProps;
        return (
            <Link
                className={`btn rounded-md ${className}`}
                href={href}
                {...(otherProps as LinkProps)}
            >
                {children}
            </Link>
        );
    }

    const { className, children, ...otherProps } = props as ButtonProps;
    return (
        <button className={`btn rounded-md ${className}`} {...otherProps}>
            {children}
        </button>
    );
}
