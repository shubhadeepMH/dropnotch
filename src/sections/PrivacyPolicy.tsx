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
            const offset = isAppMode ? 90 : 140; // Accounts for sticky header
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
                        <mark key={i} className="bg-[#ff4757]/20 text-[#ff4757] rounded px-0.5 font-semibold">
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
        <div className={`relative min-h-screen text-[#4a5568] font-sans antialiased selection:bg-[#ff4757]/30 selection:text-[#ff4757] bg-[#e0e5ec] ${isAppMode ? 'pt-0' : 'pt-0'}`}>

            {/* Header / Top Nav Bar */}
            {isAppMode ? (
                // Clean native-feeling header for WebView with safe-area notch support
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
                    <h1 className="text-lg font-bold text-[#2d3436] tracking-wide">Privacy Policy</h1>
                    <div className="w-10 h-10" /> {/* Spacer to center the title */}
                </header>
            ) : (
                // Breadcrumbs & Header for the regular website
                <div className="pt-36 sm:pt-44 pb-10 sm:pb-14 border-b border-[#babecc] bg-[#e0e5ec]">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <div className="flex items-center gap-2 text-sm text-[#4a5568] mb-4">
                            <a href="/" className="hover:text-[#ff4757] transition-colors font-medium">Home</a>
                            <svg className="h-3 w-3 text-[#718096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[#2d3436] font-semibold">Privacy Policy</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#2d3436] tracking-tight sm:text-5xl">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-base text-[#4a5568] max-w-2xl leading-relaxed">
                            Welcome to <strong className="text-[#2d3436]">Drow (Dr On The Way)</strong>. We respect your privacy and are committed to protecting your personal information.
                        </p>
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-8 sm:pt-12"
                style={isAppMode ? { marginTop: 'calc(5.5rem + env(safe-area-inset-top, 0px))' } : undefined}
            >
                <div className="flex gap-10 lg:gap-14">

                    {/* Desktop Sidebar — full height, fixed left panel */}
                    {!isAppMode && (
                        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 flex-shrink-0">
                            <div className="sticky top-32 flex flex-col h-[calc(100vh-160px)]">
                                <div className="rounded-2xl bg-[#f0f2f5] border border-white shadow-[6px_6px_14px_#babecc,-6px_-6px_14px_#ffffff] p-6 flex flex-col flex-grow overflow-hidden">
                                    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#babecc]/50">
                                        <span className="w-2 h-5 bg-[#ff4757] rounded-full"></span>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#2d3436]">
                                            Quick Navigation
                                        </h3>
                                    </div>
                                    <nav className="space-y-1 flex-grow overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#babecc] scrollbar-track-transparent">
                                        {POLICY_SECTIONS.map((section) => {
                                            const isActive = activeSection === section.id;
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`w-full text-left text-sm py-3 px-4 rounded-xl transition-all duration-200 ${isActive
                                                        ? 'bg-[#d1d9e6] text-[#ff4757] border-l-4 border-[#ff4757] font-bold shadow-[inset_2px_2px_5px_#babecc,inset_-2px_-2px_5px_#ffffff]'
                                                        : 'text-[#4a5568] hover:text-[#2d3436] hover:bg-[#e0e5ec]/60 border-l-4 border-transparent'
                                                        }`}
                                                >
                                                    {section.title.split('. ')[1] || section.title}
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Main content body */}
                    <div className={`flex-grow min-w-0 space-y-10`}>

                        {/* Search & Header Stats */}
                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-[#f0f2f5] border border-white rounded-2xl p-5 sm:p-6 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff]">
                            <div className="w-full sm:w-auto text-left flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d1d9e6] shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] text-[#ff4757]">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#ff4757] font-bold">Effective Date</p>
                                    <p className="text-base font-bold text-[#2d3436] mt-0.5">June 7, 2026</p>
                                </div>
                            </div>
                            <div className="relative w-full sm:max-w-md">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#718096]">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search policy terms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#d1d9e6] text-[#2d3436] placeholder-[#718096] font-semibold shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#babecc,inset_-3px_-3px_6px_#ffffff,0_0_0_2.5px_#ff4757] outline-none rounded-2xl px-5 py-3.5 pl-12 transition-all text-sm tracking-wide"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#718096] hover:text-[#ff4757] transition-colors"
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
                            <div className="text-sm text-[#4a5568] font-medium pl-2">
                                Found {filteredSections.length} sections matching &quot;<span className="text-[#2d3436] font-bold">{searchQuery}</span>&quot;
                            </div>
                        )}

                        {/* Sections List */}
                        <div className="space-y-8">
                            <AnimatePresence mode="popLayout">
                                {filteredSections.length > 0 ? (
                                    filteredSections.map((section, index) => (
                                        <motion.section
                                            key={section.id}
                                            id={section.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                                            className="group relative rounded-2xl border border-white bg-[#f0f2f5] p-6 sm:p-8 lg:p-10 shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#babecc,-12px_-12px_24px_#ffffff] transition-all duration-300"
                                        >
                                            <h2 className="text-xl font-bold text-[#2d3436] mb-5 sm:text-2xl lg:text-[1.7rem] flex items-center gap-3">
                                                <span className="w-2.5 h-6 bg-[#ff4757] rounded-full flex-shrink-0"></span>
                                                <span>
                                                    {highlightText(section.title, searchQuery)}
                                                </span>
                                            </h2>

                                            {section.introduction && (
                                                <p className="text-[#4a5568] leading-relaxed mb-5 text-sm sm:text-base lg:text-lg">
                                                    {highlightText(section.introduction, searchQuery)}
                                                </p>
                                            )}

                                            {section.content && (
                                                <p className="text-[#4a5568] leading-relaxed mb-5 text-sm sm:text-base lg:text-lg">
                                                    {highlightText(section.content, searchQuery)}
                                                </p>
                                            )}

                                            {/* Standard List Items */}
                                            {section.items && (
                                                <ul className="space-y-3 mb-5 text-[#4a5568] pl-1">
                                                    {section.items.map((item, i) => (
                                                        <li key={i} className="flex items-start text-sm sm:text-base lg:text-lg leading-relaxed">
                                                            <span className="h-2 w-2 rounded-full bg-[#ff4757] mr-3 mt-2.5 flex-shrink-0" />
                                                            <span>{highlightText(item, searchQuery)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Subsections rendering */}
                                            {section.subsections && (
                                                <div className="mt-6 space-y-7 pl-5 sm:pl-7 border-l-2 border-[#babecc]">
                                                    {section.subsections.map((sub, i) => (
                                                        <div key={i} className="space-y-3">
                                                            <h3 className="text-base lg:text-lg font-bold text-[#2d3436] flex items-center gap-2.5">
                                                                <span className="h-2.5 w-2.5 rounded-full border border-white bg-[#f0f2f5] shadow-[2px_2px_4px_#babecc,-2px_-2px_4px_#ffffff] flex-shrink-0" />
                                                                {highlightText(sub.title, searchQuery)}
                                                            </h3>
                                                            {sub.content && (
                                                                <p className="text-sm lg:text-base text-[#4a5568] leading-relaxed pl-6">
                                                                    {highlightText(sub.content, searchQuery)}
                                                                </p>
                                                            )}
                                                            {sub.items && (
                                                                <ul className="space-y-2.5 text-sm lg:text-base text-[#4a5568] pl-6">
                                                                    {sub.items.map((item, itemIdx) => (
                                                                        <li key={itemIdx} className="flex items-start leading-relaxed">
                                                                            <span className="h-1.5 w-2 rounded bg-[#ff4757]/60 mr-3 mt-2.5 flex-shrink-0" />
                                                                            <span>{highlightText(item, searchQuery)}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                            {/* Nested Subsections for Doctors/Clinics list */}
                                                            {(sub as any).subsections && (
                                                                <div className="mt-4 space-y-4 pl-4 sm:pl-6 border-l-2 border-[#babecc]/50">
                                                                    {(sub as any).subsections.map((nested: any, nestedIdx: number) => (
                                                                        <div key={nestedIdx} className="bg-[#e0e5ec]/40 rounded-xl p-5 shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] space-y-3">
                                                                            <h4 className="text-sm lg:text-base font-bold text-[#2d3436] flex items-center gap-2">
                                                                                <span className="h-1.5 w-1.5 rounded-full bg-[#ff4757]" />
                                                                                {highlightText(nested.title, searchQuery)}
                                                                            </h4>
                                                                            {nested.items && (
                                                                                <ul className="space-y-2 text-xs lg:text-sm text-[#4a5568] pl-4">
                                                                                    {nested.items.map((ni: string, niIdx: number) => (
                                                                                        <li key={niIdx} className="flex items-start">
                                                                                            <span className="h-1.5 w-1.5 rounded-full bg-[#718096] mr-2.5 mt-1.5 flex-shrink-0" />
                                                                                            <span>{highlightText(ni, searchQuery)}</span>
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
                                    <div className="text-center py-16 bg-[#f0f2f5] border-2 border-dashed border-[#babecc] rounded-2xl shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff]">
                                        <svg className="mx-auto h-12 w-12 text-[#718096] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="text-lg font-bold text-[#2d3436] mb-2">No Results Found</h3>
                                        <p className="text-sm text-[#4a5568] max-w-xs mx-auto">
                                            We couldn&apos;t find any sections matching &quot;{searchQuery}&quot;. Try adjusting your keywords.
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>  {/* end flex row */}
            </div>

            {/* Mobile TOC Floating Button — only shows menu icon */}
            {!isTocOpen && (
                <div className="fixed bottom-6 right-6 z-40 lg:hidden">
                    <button
                        onClick={() => setIsTocOpen(true)}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f2f5] text-[#2d3436] hover:text-[#ff4757] shadow-[6px_6px_12px_#babecc,-6px_-6px_12px_#ffffff] border border-white active:scale-95 transition-all"
                        aria-label="Table of Contents"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Mobile TOC Modal — 80% height with close inside */}
            <AnimatePresence>
                {isTocOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsTocOpen(false)}
                            className="fixed inset-0 bg-[#2d3436]/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        {/* Slide-up Bottom Drawer — 80vh */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                            className="fixed bottom-0 left-0 right-0 h-[80vh] rounded-t-[2rem] bg-[#f0f2f5] border-t border-white px-6 pb-8 pt-4 shadow-[-10px_-10px_30px_rgba(0,0,0,0.05),10px_10px_30px_rgba(0,0,0,0.1)] z-50 flex flex-col lg:hidden"
                        >
                            {/* Drag handle */}
                            <div className="w-12 h-1.5 bg-[#d1d9e6] rounded-full mx-auto mb-5 shadow-[inset_1px_1px_2px_#babecc,inset_-1px_-1px_2px_#ffffff]" />

                            <div className="flex items-center justify-between mb-5 border-b border-[#babecc]/50 pb-4">
                                <h4 className="text-lg font-bold text-[#2d3436] uppercase tracking-wider">
                                    Table of Contents
                                </h4>
                                <button
                                    onClick={() => setIsTocOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0e5ec] text-[#4a5568] hover:text-[#ff4757] shadow-[3px_3px_6px_#babecc,-3px_-3px_6px_#ffffff] active:shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff] active:scale-95 transition-all"
                                    aria-label="Close navigation"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-2 overflow-y-auto pr-1 flex-grow pb-4 scrollbar-thin scrollbar-thumb-[#babecc] scrollbar-track-transparent">
                                {POLICY_SECTIONS.map((sec) => {
                                    const isActive = activeSection === sec.id;
                                    return (
                                        <button
                                            key={sec.id}
                                            onClick={() => scrollToSection(sec.id)}
                                            className={`w-full text-left text-sm py-3.5 px-4 rounded-xl transition-all duration-200 border-l-4 ${isActive
                                                ? 'bg-[#d1d9e6] text-[#ff4757] border-[#ff4757] font-bold shadow-[inset_2px_2px_4px_#babecc,inset_-2px_-2px_4px_#ffffff]'
                                                : 'text-[#4a5568] hover:text-[#2d3436] hover:bg-[#e0e5ec]/60 border-transparent'
                                                }`}
                                        >
                                            {sec.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
