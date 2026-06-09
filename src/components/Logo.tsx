interface LogoProps {
    className?: string;
    href?: string;
}

export function Logo({ className = '', href }: LogoProps) {
    const isPrivacyPage = typeof window !== 'undefined' && (
        window.location.pathname === '/privacy' ||
        window.location.pathname === '/privacy-policy' ||
        window.location.hash.startsWith('#/privacy')
    );
    
    const targetHref = href || (isPrivacyPage ? '/' : '#home');

    return (
        <a
            href={targetHref}
            className={`group flex items-center gap-2.5 ${className}`}
            aria-label="DropNotch Home"
        >
            {/* Logo mark */}
            <img
                src="/site_logo.png"
                alt="DropNotch Logo"
                className="h-10 w-10 object-contain"
            />
            {/* Wordmark */}
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-family-heading)]">
                <span className="gradient-text">Drop</span>
                <span className="text-text-primary">Notch</span>
            </span>
        </a>
    );
}
