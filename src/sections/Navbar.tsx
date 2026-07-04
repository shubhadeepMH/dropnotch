import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Drow', href: '#drow' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isPrivacyPage = typeof window !== 'undefined' && (
        window.location.pathname === '/privacy' ||
        window.location.pathname === '/privacy-policy' ||
        window.location.hash.startsWith('#/privacy')
    );

    const navLinksMapped = navLinks.map((link) => ({
        ...link,
        href: isPrivacyPage ? `/${link.href}` : link.href,
    }));

    const contactHref = isPrivacyPage ? '/#contact' : '#contact';

    const navBackgroundClass = scrolled
        ? 'border-b border-[#babecc] bg-[#f0f2f5]/90 backdrop-blur-md'
        : 'bg-transparent';

    const navPaddingClass = scrolled
        ? 'py-6 md:py-8'
        : 'py-10 md:py-16';

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${navBackgroundClass} ${navPaddingClass}`}
        >
            <div className="flex w-full items-center justify-between px-6 md:px-12">
                <Logo />

                {/* Desktop Nav */}
                <div className="hidden items-center gap-12 md:flex">
                    {navLinksMapped.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-base md:text-xl font-semibold text-[#4a5568] transition-colors hover:text-[#ff4757] uppercase tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button href={contactHref} variant="primary" className="ml-8">
                        Get Started
                    </Button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="recessed-icon p-4 text-[#2d3436] transition-colors hover:text-[#ff4757] md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 top-full w-full border-b border-[#babecc] bg-[#f0f2f5] px-6 py-8 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinksMapped.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-semibold text-[#4a5568] hover:text-[#ff4757] uppercase tracking-wide"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button href={contactHref} onClick={() => setIsOpen(false)}>
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
