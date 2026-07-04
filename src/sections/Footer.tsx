import { Logo } from '../components/Logo';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[#babecc] bg-[#e0e5ec] py-12 px-6 sm:px-8 mt-auto">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <Logo />
                    <span className="hidden md:block h-5 w-px bg-[#babecc]"></span>
                    <p className="text-sm text-[#4a5568]">
                        &copy; {currentYear} DropNotch Development. All rights reserved.
                    </p>
                    <span className="hidden md:block h-5 w-px bg-[#babecc]"></span>
                    <a
                        href="/privacy"
                        className="text-sm text-[#4a5568] hover:text-[#ff4757] transition-colors"
                    >
                        Privacy Policy
                    </a>
                </div>

                <a
                    href="mailto:dropnotch@zohomail.in"
                    className="group flex items-center gap-2 text-sm text-[#4a5568] transition-colors hover:text-[#ff4757]"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg recessed-icon transition-colors">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    dropnotch@zohomail.in
                </a>
            </div>
        </footer>
    );
}
