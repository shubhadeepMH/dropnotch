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
            <div className="recessed-icon h-12 w-12 rounded-xl">
                <img
                    src="/site_logo.png"
                    alt="DropNotch Logo"
                    className="h-8 w-8 object-contain"
                />
            </div>
            {/* Wordmark */}
            <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-family-primary)]">
                <span className="gradient-text">Drop</span>
                <span className="text-[#2d3436]">Notch</span>
            </span>
        </a>
    );
}
