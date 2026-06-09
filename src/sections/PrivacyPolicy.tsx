import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Structured policy data for interactive features (search, TOC, navigation)
interface Subsection {
    title: string;
    content: string;
    items?: string[];
}

interface PolicySection {
    id: string;
    title: string;
    introduction?: string;
    subsections?: Subsection[];
    content?: string;
    items?: string[];
}

const POLICY_SECTIONS: PolicySection[] = [
    {
        id: 'info-we-collect',
        title: '1. Information We Collect',
        introduction: 'We may collect the following types of information:',
        subsections: [
            {
                title: 'Personal Information',
                content: 'When you create an account or use our services, we may collect:',
                items: [
                    'Full name',
                    'Email address',
                    'Phone number',
                    'Username',
                    'Password',
                    'Profile picture',
                    'Gender (for personalized health tips)'
                ]
            },
            {
                title: 'Account Information',
                content: 'Depending on your account type (User, Doctor, or Clinic), we may collect additional information such as:',
                subsections: [
                    {
                        title: 'Doctor Accounts',
                        content: '',
                        items: [
                            'Medical specialization',
                            'Educational qualifications',
                            'Experience details',
                            'Practice addresses',
                            'Consultation fees',
                            'Contact information'
                        ]
                    },
                    {
                        title: 'Clinic Accounts',
                        content: '',
                        items: [
                            'Clinic name',
                            'Address',
                            'Contact information',
                            'Associated doctors',
                            'Service details'
                        ]
                    }
                ]
            } as any, // Typed for nested lists
            {
                title: 'User-Generated Content',
                content: 'We may collect content that you voluntarily submit, including:',
                items: [
                    'Doctor listings',
                    'Clinic listings',
                    'Ratings',
                    'Reviews',
                    'Comments',
                    'Feedback',
                    'Profile information'
                ]
            },
            {
                title: 'Location Information',
                content: "With your permission, Drow may access your device's location to show nearby doctors and clinics, improve search results, or open navigation/map services. You may disable location permissions at any time through your device settings."
            },
            {
                title: 'Device and Usage Information',
                content: 'We may automatically collect device type, operating system, app version, IP address, device identifiers, usage statistics, and error/crash logs.'
            }
        ]
    },
    {
        id: 'how-we-use',
        title: '2. How We Use Your Information',
        content: 'We use the collected information to:',
        items: [
            'Create and manage user accounts & authenticate users',
            'Provide healthcare discovery services & display doctors and clinics',
            'Manage ratings and reviews & process user-submitted listings',
            'Award wallet credits and rewards',
            'Personalize health tips and recommendations',
            'Improve app performance and user experience',
            'Respond to support requests',
            'Detect fraud, abuse, or unauthorized activity',
            'Comply with legal obligations'
        ]
    },
    {
        id: 'user-contributions',
        title: '3. User Contributions and Public Content',
        content: 'Drow allows users to submit content including doctor listings, clinic listings, ratings, reviews, and comments. Any information you voluntarily publish within public areas of the app may be visible to other users. Please avoid sharing sensitive personal information in public comments or reviews.'
    },
    {
        id: 'wallet-system',
        title: '4. Wallet and Reward System',
        content: 'Drow may reward users with virtual credits for contributing content such as adding doctors or clinics. These credits are promotional in nature, have no monetary value unless explicitly stated by Drow, and may be modified, suspended, or removed at our discretion.'
    },
    {
        id: 'third-party-services',
        title: '5. Third-Party Services',
        content: 'Drow may use third-party services to provide functionality and improve the platform. These services may include image hosting providers, cloud hosting providers, mapping/navigation services, analytics services, and notification services. These third-party providers have their own privacy policies governing how they handle information.'
    },
    {
        id: 'sharing-info',
        title: '6. Sharing of Information',
        content: 'We do not sell your personal information. We may share information in the following circumstances:',
        subsections: [
            {
                title: 'With Your Consent',
                content: 'When you explicitly authorize us to share information.'
            },
            {
                title: 'Service Providers',
                content: 'With trusted third-party providers who assist in operating our services.'
            },
            {
                title: 'Legal Requirements',
                content: 'If required by law, regulation, legal process, or government request.'
            },
            {
                title: 'Protection of Rights',
                content: 'To protect the rights, safety, security, and property of Drow, our users, or others.'
            }
        ]
    },
    {
        id: 'storage-security',
        title: '7. Data Storage and Security',
        content: 'We implement reasonable technical and organizational measures to protect your information. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security. Users are responsible for maintaining the confidentiality of their account credentials.'
    },
    {
        id: 'data-retention',
        title: '8. Data Retention',
        content: 'We retain personal information only for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer required, it may be securely deleted or anonymized.'
    },
    {
        id: 'privacy-rights',
        title: '9. Your Privacy Rights',
        content: 'Depending on applicable laws, you may have the right to access your personal information, correct inaccurate information, request deletion of your information, withdraw consent where applicable, or object to certain processing activities. To exercise any of these rights, please contact us through the support channels provided in the app.'
    },
    {
        id: 'account-deletion',
        title: '10. Account Deletion',
        content: 'Users may request deletion of their account and associated personal information. Certain information may be retained where required by law, for fraud prevention, dispute resolution, security purposes, or legitimate business needs.'
    },
    {
        id: 'children-privacy',
        title: '11. Children\'s Privacy',
        content: 'Drow is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided personal information, we will take reasonable steps to remove such information.'
    },
    {
        id: 'app-permissions',
        title: '12. App Permissions',
        content: 'Drow may request access to the following device permissions:',
        subsections: [
            {
                title: 'Camera',
                content: 'To upload profile pictures and images.'
            },
            {
                title: 'Photos and Storage',
                content: 'To select and upload images from your device.'
            },
            {
                title: 'Location',
                content: 'To provide location-based healthcare discovery features.'
            },
            {
                title: 'Internet Access',
                content: 'To connect to our services and retrieve information.'
            }
        ]
    },
    {
        id: 'medical-disclaimer',
        title: '13. Medical Disclaimer',
        content: 'Drow is a healthcare discovery and information platform. Drow does not provide medical advice, diagnosis, treatment, emergency services, or healthcare consultations. Information available within the app is provided for informational purposes only and should not be considered a substitute for professional medical advice. Always consult a qualified healthcare professional regarding medical concerns.'
    },
    {
        id: 'changes-policy',
        title: '14. Changes to This Privacy Policy',
        content: 'We may update this Privacy Policy from time to time. When significant changes are made, we may notify users through the app or other appropriate communication methods. The updated version becomes effective immediately upon publication.'
    },
    {
        id: 'contact-us',
        title: '15. Contact Us',
        content: 'If you have questions, concerns, or requests regarding this Privacy Policy, please contact us through:',
        subsections: [
            {
                title: 'Drow (Dr On The Way)',
                content: 'Powered by DropNotch'
            },
            {
                title: 'Website',
                content: 'https://dropnotch.com'
            },
            {
                title: 'Email',
                content: 'dropnotch@zohomail.in'
            },
            {
                title: 'Support',
                content: 'Please contact us through the Support Form in the Drow app or via the contact form on our website.'
            }
        ]
    }
];

export function PrivacyPolicy() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState(POLICY_SECTIONS[0].id);
    const [isTocOpen, setIsTocOpen] = useState(false);
    const [isAppMode, setIsAppMode] = useState(false);

    // Detect app mode query parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('app') === 'true') {
            setIsAppMode(true);
        }
    }, []);

    // Set up intersection observer to highlight current reading section on desktop sidebar
    useEffect(() => {
        const observers = POLICY_SECTIONS.map((section) => {
            const el = document.getElementById(section.id);
            if (!el) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section.id);
                    }
                },
                {
                    rootMargin: '-20% 0px -60% 0px', // Trigger near top/middle of page
                }
            );

            observer.observe(el);
            return { observer, el };
        });

        return () => {
            observers.forEach((obs) => {
                if (obs) obs.observer.unobserve(obs.el);
            });
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = isAppMode ? 80 : 120; // Accounts for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsTocOpen(false);
        }
    };

    const handleBackClick = () => {
        // Safe navigation for mobile WebView
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to home route
            window.location.href = '/';
        }
    };

    // Helper to highlight matching text search results
    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;
        const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={i} className="bg-cyan-500/30 text-accent-cyan-soft rounded px-0.5 font-medium">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    // Filters sections containing query (or just highlights them dynamically)
    const matchesSearch = (section: PolicySection, query: string) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        const checkText = (text?: string) => text?.toLowerCase().includes(q);

        if (checkText(section.title) || checkText(section.introduction) || checkText(section.content)) return true;

        if (section.items?.some(item => item.toLowerCase().includes(q))) return true;

        if (section.subsections?.some(sub => {
            if (checkText(sub.title) || checkText(sub.content)) return true;
            if (sub.items?.some(item => item.toLowerCase().includes(q))) return true;
            if ((sub as any).subsections?.some((nested: any) => {
                if (checkText(nested.title) || checkText(nested.content)) return true;
                if (nested.items?.some((item: string) => item.toLowerCase().includes(q))) return true;
                return false;
            })) return true;
            return false;
        })) return true;

        return false;
    };

    const filteredSections = POLICY_SECTIONS.filter(sec => matchesSearch(sec, searchQuery));

    return (
        <div className={`relative min-h-screen text-gray-300 font-sans antialiased selection:bg-accent-indigo selection:text-white ${isAppMode ? 'bg-[#0B0F19]' : 'bg-[#0B0F19]'}`}>

            {/* Header / Top Nav Bar */}
            {isAppMode ? (
                // Clean native-feeling header for WebView with safe-area notch support
                <header
                    className="fixed top-0 left-0 w-full z-40 flex items-center justify-between border-b border-gray-800 bg-[#0B0F19]/95 px-4 backdrop-blur-md"
                    style={{
                        paddingTop: 'env(safe-area-inset-top, 0px)',
                        height: 'calc(4.5rem + env(safe-area-inset-top, 0px))'
                    }}
                >
                    <button
                        onClick={handleBackClick}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-base-light text-gray-300 transition-colors hover:text-white active:scale-95"
                        aria-label="Go Back"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-white tracking-wide">Privacy Policy</h1>
                    <div className="w-10 h-10" /> {/* Spacer to center the title */}
                </header>
            ) : (
                // Breadcrumbs & Header for the regular website
                <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 border-b border-gray-800 bg-[#0B0F19]">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-300 font-medium">Privacy Policy</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-base text-gray-400 max-w-2xl leading-relaxed">
                            Welcome to <strong className="text-white">Drow (Dr On The Way)</strong>. We respect your privacy and are committed to protecting your personal information.
                        </p>
                    </div>
                </div>
            )}

            {/* Main content grid */}
            <div
                className="mx-auto max-w-7xl px-4 pb-8 sm:pb-12 pt-8 sm:pt-12"
                style={isAppMode ? { marginTop: 'calc(5.5rem + env(safe-area-inset-top, 0px))' } : undefined}
            >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

                    {/* Desktop Sidebar (Table of Contents) */}
                    {!isAppMode && (
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-28 space-y-6">
                                <div className="rounded-xl border border-gray-800 bg-base-light/50 p-5 backdrop-blur">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                                        Quick Navigation
                                    </h3>
                                    <nav className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                                        {POLICY_SECTIONS.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all ${activeSection === section.id
                                                    ? 'bg-accent-indigo/25 text-accent-cyan-soft border-l-2 border-accent-cyan font-medium'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                                                    }`}
                                            >
                                                {section.title.split('. ')[1] || section.title}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Main content body */}
                    <div className={`col-span-1 ${isAppMode ? 'lg:col-span-4' : 'lg:col-span-3'} space-y-8`}>

                        {/* Search & Header Stats */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-base-card border border-gray-800 rounded-xl p-4 sm:p-6 shadow-xl">
                            <div className="w-full sm:w-auto text-left">
                                <p className="text-xs uppercase tracking-widest text-accent-cyan font-bold">Effective Date</p>
                                <p className="text-sm font-semibold text-white mt-0.5">June 7, 2026</p>
                            </div>
                            <div className="relative w-full sm:max-w-xs">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search policy terms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="saas-input pl-10 h-11 w-full bg-base/80"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Search Result Status */}
                        {searchQuery && (
                            <div className="text-sm text-gray-400">
                                Found {filteredSections.length} sections matching &quot;<span className="text-white font-medium">{searchQuery}</span>&quot;
                            </div>
                        )}

                        {/* Sections List */}
                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {filteredSections.length > 0 ? (
                                    filteredSections.map((section, index) => (
                                        <motion.section
                                            key={section.id}
                                            id={section.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                                            className="group relative rounded-2xl border border-gray-800/80 bg-base-card/40 p-6 sm:p-8 hover:border-gray-800 transition-all duration-300"
                                        >
                                            {/* Accent Gradient Border Effect on Hover */}
                                            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-accent-indigo/10 via-accent-violet/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                            <h2 className="text-xl font-bold text-white mb-4 sm:text-2xl flex items-center gap-3">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan-soft to-accent-indigo">
                                                    {highlightText(section.title, searchQuery)}
                                                </span>
                                            </h2>

                                            {section.introduction && (
                                                <p className="text-gray-300 leading-relaxed mb-4">
                                                    {highlightText(section.introduction, searchQuery)}
                                                </p>
                                            )}

                                            {section.content && (
                                                <p className="text-gray-300 leading-relaxed mb-4">
                                                    {highlightText(section.content, searchQuery)}
                                                </p>
                                            )}

                                            {/* Standard List Items */}
                                            {section.items && (
                                                <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
                                                    {section.items.map((item, i) => (
                                                        <li key={i} className="leading-relaxed">
                                                            {highlightText(item, searchQuery)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Subsections rendering */}
                                            {section.subsections && (
                                                <div className="mt-6 space-y-6 pl-2 sm:pl-4 border-l border-gray-800">
                                                    {section.subsections.map((sub, i) => (
                                                        <div key={i} className="space-y-2">
                                                            <h3 className="text-base font-semibold text-white flex items-center gap-2">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                                                                {highlightText(sub.title, searchQuery)}
                                                            </h3>
                                                            {sub.content && (
                                                                <p className="text-sm text-gray-400 leading-relaxed">
                                                                    {highlightText(sub.content, searchQuery)}
                                                                </p>
                                                            )}
                                                            {sub.items && (
                                                                <ul className="list-circle pl-6 space-y-1.5 text-sm text-gray-400">
                                                                    {sub.items.map((item, itemIdx) => (
                                                                        <li key={itemIdx}>
                                                                            {highlightText(item, searchQuery)}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                            {/* Nested Subsections for Doctors/Clinics list */}
                                                            {(sub as any).subsections && (
                                                                <div className="mt-3 space-y-4 pl-4 border-l border-gray-800/60">
                                                                    {(sub as any).subsections.map((nested: any, nestedIdx: number) => (
                                                                        <div key={nestedIdx} className="space-y-1">
                                                                            <h4 className="text-sm font-medium text-gray-300">
                                                                                {highlightText(nested.title, searchQuery)}
                                                                            </h4>
                                                                            {nested.items && (
                                                                                <ul className="list-square pl-5 space-y-1 text-xs text-gray-400">
                                                                                    {nested.items.map((ni: string, niIdx: number) => (
                                                                                        <li key={niIdx}>
                                                                                            {highlightText(ni, searchQuery)}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.section>
                                    ))
                                ) : (
                                    <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl">
                                        <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="text-lg font-bold text-white mb-2">No Results Found</h3>
                                        <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                            We couldn&apos;t find any sections matching &quot;{searchQuery}&quot;. Try adjusting your keywords.
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile TOC Drawer/Floating Button - rendered on all mobile/tablet viewports */}
            <div className="fixed bottom-6 right-6 z-40 lg:hidden">
                <button
                    onClick={() => setIsTocOpen(!isTocOpen)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan text-white shadow-lg shadow-accent-indigo/35 active:scale-95 transition-all"
                    aria-label="Table of Contents"
                >
                    {isTocOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    )}
                </button>

                <AnimatePresence>
                    {isTocOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-16 right-0 w-72 rounded-2xl border border-gray-800 bg-base-card p-4 shadow-2xl backdrop-blur-md"
                        >
                            <h4 className="text-sm font-bold text-white mb-3 tracking-wider uppercase">
                                Table of Contents
                            </h4>
                            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
                                {POLICY_SECTIONS.map((sec) => (
                                    <button
                                        key={sec.id}
                                        onClick={() => scrollToSection(sec.id)}
                                        className="w-full text-left text-xs py-2 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/40 transition-colors block truncate"
                                    >
                                        {sec.title}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
