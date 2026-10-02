import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AccountDeletion() {
    const [isAppMode, setIsAppMode] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedSubject, setCopiedSubject] = useState(false);

    const supportEmail = 'shubhadeepmahato123@gmail.com';
    const emailSubject = 'Drow Account Deletion Request';

    // Detect app mode query parameter (?app=true)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        if (params.get('app') === 'true' || hashParams.get('app') === 'true') {
            setIsAppMode(true);
        }
    }, []);

    const handleBackClick = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    const copyToClipboard = (text: string, type: 'email' | 'subject') => {
        navigator.clipboard.writeText(text);
        if (type === 'email') {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } else {
            setCopiedSubject(true);
            setTimeout(() => setCopiedSubject(false), 2000);
        }
    };

    return (
        <div className={`relative min-h-screen text-[#4a5568] font-sans antialiased selection:bg-[#ff4757]/30 selection:text-[#ff4757] bg-[#e0e5ec] ${isAppMode ? 'pt-0' : 'pt-0'}`}>

            {/* Header / Top Nav Bar */}
            {isAppMode ? (
                // Standalone app-like header for mobile app WebView
                <header
                    className="fixed top-0 left-0 w-full z-40 flex items-center justify-between border-b border-[#babecc] bg-[#f0f2f5]/95 px-4 backdrop-blur-md shadow-sm"
                    style={{
                        paddingTop: 'env(safe-area-inset-top, 0px)',
                        height: 'calc(4.5rem + env(safe-area-inset-top, 0px))'
                    }}
                >
                    <button
                        onClick={handleBackClick}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[#f0f2f5] text-[#2d3436] transition-all hover:text-[#ff4757] shadow-[4px_4px_8px_#babecc,-4px_-4px_8px_#ffffff] active:scale-95 active:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]"
                        aria-label="Go Back"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-[#2d3436] tracking-wide">Account Deletion</h1>
                    <div className="w-10 h-10" />
                </header>
            ) : (
                // Website standard header & breadcrumbs
                <div className="pt-36 sm:pt-44 pb-10 sm:pb-14 border-b border-[#babecc] bg-[#e0e5ec]">
                    <div className="mx-auto max-w-4xl px-6 sm:px-8">
                        <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
                            <a href="/" className="hover:text-[#ff4757] transition-colors font-medium">Home</a>
                            <svg className="h-3 w-3 text-[#718096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[#2d3436] font-semibold">Account Deletion</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d1d9e6] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] text-xs font-bold text-[#ff4757] tracking-wider uppercase mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#ff4757] animate-pulse"></span>
                            Drow Mobile App
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#2d3436] tracking-tight sm:text-5xl">
                            Delete Your Drow Account
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-[#4a5568] leading-relaxed">
                            If you want to delete your <strong className="text-[#2d3436]">Drow</strong> account and associated data, you can request account deletion by contacting our support team.
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main
                className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-8 sm:pt-12 space-y-8"
                style={isAppMode ? { marginTop: 'calc(5.5rem + env(safe-area-inset-top, 0px))' } : undefined}
            >
                {/* Notice Card for App Mode header title */}
                {isAppMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#f0f2f5] border border-white rounded-2xl p-6 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d1d9e6] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] text-xs font-bold text-[#ff4757] tracking-wider uppercase mb-2">
                            Drow Mobile App
                        </div>
                        <h1 className="text-2xl font-extrabold text-[#2d3436]">
                            Delete Your Drow Account
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-[#4a5568]">
                            If you want to delete your Drow account and associated data, you can request account deletion by contacting our support team.
                        </p>
                    </motion.div>
                )}

                {/* Primary Action Card: How to Request Deletion */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-white bg-[#f0f2f5] p-6 sm:p-8 lg:p-10 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2.5 h-7 bg-[#ff4757] rounded-full flex-shrink-0"></span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2d3436]">
                            How to request deletion
                        </h2>
                    </div>

                    <p className="text-base sm:text-lg text-[#4a5568] leading-relaxed mb-6">
                        To request deletion of your account and personal data, follow the steps below:
                    </p>

                    {/* Quick Mailto Action Button */}
                    <div className="mb-8 bg-[#e0e5ec] p-5 sm:p-6 rounded-2xl shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider font-bold text-[#718096]">Direct Support Contact</p>
                                <p className="text-base sm:text-lg font-bold text-[#2d3436] font-mono break-all">{supportEmail}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href={`mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ff4757] text-white font-bold text-sm shadow-[4px_4px_10px_rgba(255,71,87,0.3)] hover:bg-[#ff3344] active:scale-95 transition-all"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Support
                                </a>
                                <button
                                    onClick={() => copyToClipboard(supportEmail, 'email')}
                                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#f0f2f5] text-[#2d3436] font-semibold text-sm border border-white shadow-[3px_3px_6px_#babecc,-3px_-3px_6px_#ffffff] hover:text-[#ff4757] active:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all"
                                >
                                    {copiedEmail ? 'Copied!' : 'Copy Email'}
                                </button>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-[#babecc]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-[#718096] font-medium">Required Subject:</span>
                                <span className="font-semibold text-[#2d3436] font-mono bg-[#f0f2f5] px-2 py-0.5 rounded shadow-[inset_1px_1px_2px_#babecc]">{emailSubject}</span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(emailSubject, 'subject')}
                                className="text-xs font-bold text-[#ff4757] hover:underline self-start sm:self-auto"
                            >
                                {copiedSubject ? 'Copied Subject!' : 'Copy Subject Line'}
                            </button>
                        </div>
                    </div>

                    {/* Email details list */}
                    <div className="space-y-4">
                        <p className="text-sm sm:text-base font-bold text-[#2d3436]">
                            In your email, please provide:
                        </p>
                        <ul className="space-y-3 pl-1">
                            <li className="flex items-start text-sm sm:text-base text-[#4a5568]">
                                <span className="h-2 w-2 rounded-full bg-[#ff4757] mr-3 mt-2 flex-shrink-0" />
                                <span><strong className="text-[#2d3436]">Your registered email address or username</strong> associated with your Drow account</span>
                            </li>
                            <li className="flex items-start text-sm sm:text-base text-[#4a5568]">
                                <span className="h-2 w-2 rounded-full bg-[#ff4757] mr-3 mt-2 flex-shrink-0" />
                                <span><strong className="text-[#2d3436]">Your full name</strong>, if applicable</span>
                            </li>
                            <li className="flex items-start text-sm sm:text-base text-[#4a5568]">
                                <span className="h-2 w-2 rounded-full bg-[#ff4757] mr-3 mt-2 flex-shrink-0" />
                                <span><strong className="text-[#2d3436]">A clear statement</strong> that you want to delete your Drow account</span>
                            </li>
                        </ul>
                    </div>

                    {/* Security Alert Callout */}
                    <div className="mt-8 rounded-xl border-l-4 border-[#ff4757] bg-[#ff4757]/10 p-4 sm:p-5 shadow-[inset_2px_2px_4px_rgba(190,190,190,0.2)]">
                        <div className="flex items-start gap-3">
                            <div className="p-1 text-[#ff4757]">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm sm:text-base font-bold text-[#ff4757]">Security Notice</h4>
                                <p className="mt-1 text-xs sm:text-sm text-[#2d3436] font-medium leading-relaxed">
                                    For security reasons, <strong>NEVER</strong> send your password or other authentication credentials by email. Our support team will never ask for your password.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Process Details Card */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="rounded-2xl border border-white bg-[#f0f2f5] p-6 sm:p-8 lg:p-10 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2.5 h-7 bg-[#ff4757] rounded-full flex-shrink-0"></span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2d3436]">
                            What happens after your request
                        </h2>
                    </div>

                    <p className="text-base sm:text-lg text-[#4a5568] leading-relaxed mb-5">
                        Our support team will verify the request and process the account deletion promptly.
                    </p>

                    <p className="text-sm sm:text-base font-bold text-[#2d3436] mb-4">
                        Once the request is verified:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] flex items-start gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff4757] text-white font-bold text-xs flex-shrink-0 mt-0.5">1</span>
                            <div>
                                <h4 className="text-sm font-bold text-[#2d3436]">Account Removal</h4>
                                <p className="text-xs sm:text-sm text-[#4a5568] mt-1">Your Drow account will be permanently deleted from our active database.</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] flex items-start gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff4757] text-white font-bold text-xs flex-shrink-0 mt-0.5">2</span>
                            <div>
                                <h4 className="text-sm font-bold text-[#2d3436]">Personal Data Deletion</h4>
                                <p className="text-xs sm:text-sm text-[#4a5568] mt-1">Personal information associated with the account will be deleted.</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] flex items-start gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff4757] text-white font-bold text-xs flex-shrink-0 mt-0.5">3</span>
                            <div>
                                <h4 className="text-sm font-bold text-[#2d3436]">Associated Data Cleaning</h4>
                                <p className="text-xs sm:text-sm text-[#4a5568] mt-1">Data associated with the account will be deleted where applicable.</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] flex items-start gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff4757] text-white font-bold text-xs flex-shrink-0 mt-0.5">4</span>
                            <div>
                                <h4 className="text-sm font-bold text-[#2d3436]">Legal Retention Exception</h4>
                                <p className="text-xs sm:text-sm text-[#4a5568] mt-1">If info must be retained for legal, security, fraud-prevention, medical, or regulatory reasons, we retain only what is legally required.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Need Help Card */}
                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="rounded-2xl border border-white bg-[#f0f2f5] p-6 sm:p-8 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#2d3436]">
                            Need help?
                        </h3>
                        <p className="text-sm sm:text-base text-[#4a5568]">
                            If you have questions about account deletion, contact:
                        </p>
                        <p className="text-base sm:text-lg font-bold text-[#ff4757] font-mono break-all pt-1">
                            {supportEmail}
                        </p>
                    </div>

                    <a
                        href={`mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f0f2f5] text-[#ff4757] font-bold text-sm border border-white shadow-[4px_4px_8px_#babecc,-4px_-4px_8px_#ffffff] hover:text-[#ff3344] active:scale-95 active:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] transition-all flex-shrink-0"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-1.5-1.5V6.75a1.5 1.5 0 011.5-1.5h10.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H8.25z" />
                        </svg>
                        Email Drow Support
                    </a>
                </motion.section>
            </main>
        </div>
    );
}
