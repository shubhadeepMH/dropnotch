import { Logo } from '../components/Logo';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Drow', href: '#drow' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-700 bg-base py-10 px-6 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-12 text-center md:text-left items-start">
                    {/* Brand Info - Hidden on large screens as it's now in the About section */}
                    <div className="flex flex-col items-center md:items-start gap-4 lg:hidden">
                        <Logo className="h-7 w-auto" />
                        <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                            DropNotch is a service-based startup and product-focused studio
                            building high-performance digital solutions for the next
                            generation of businesses.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Navigation</h4>
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-gray-400 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Social/Contact */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Stay Connected</h4>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-gray-400">Ready to start your next project with us?</p>
                            <a
                                href="mailto:hello@dropnotch.com"
                                className="group flex items-center justify-center md:justify-start gap-3 text-sm font-medium text-white transition-colors hover:text-cyan-400"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 transition-colors group-hover:bg-indigo-600/10">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                hello@dropnotch.com
                            </a>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                                <span className="text-xs text-gray-500 italic">LinkedIn integration coming soon</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row text-xs text-gray-500 uppercase tracking-widest font-semibold">
                    <p>
                        &copy; {currentYear} DropNotch Development. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-500">Built with React &amp; Tailwind CSS</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
