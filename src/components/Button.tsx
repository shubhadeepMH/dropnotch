import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type BaseProps = {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
        href?: never;
    };

type ButtonAsLink = BaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseClasses = `btn-saas ${variant === 'primary' ? 'btn-primary shadow-lg shadow-indigo-600/20' :
            variant === 'outline' ? 'btn-outline' : 'text-gray-400 hover:text-white transition-colors'
        }`;

    const classes = `${baseClasses} ${className}`.trim();

    if ('href' in props && props.href) {
        const { href, ...rest } = props as ButtonAsLink;
        return (
            <a href={href} className={classes} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...(props as ButtonAsButton)}>
            {children}
        </button>
    );
}
