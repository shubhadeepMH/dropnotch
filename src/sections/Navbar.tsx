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

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? 'border-b border-gray-800 bg-base/80 backdrop-blur-md py-8'
                : 'bg-transparent py-14'
                }`}
        >
            <div className="flex w-full items-center justify-between px-12 md:px-24">
                <Logo className="h-12 w-auto" />

                {/* Desktop Nav */}
                <div className="hidden items-center gap-16 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-lg font-medium text-gray-300 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button href="#contact" variant="primary" className="ml-10">
                        Get Started
                    </Button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="p-1 text-gray-300 transition-colors hover:text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="absolute left-0 top-full w-full border-b border-gray-800 bg-base-light px-6 py-8 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button href="#contact" onClick={() => setIsOpen(false)}>
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
