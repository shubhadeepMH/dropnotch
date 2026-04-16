import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SectionWrapper } from '../components/SectionWrapper';

export function Product() {
    return (
        <SectionWrapper id="drow" withDots>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Left: Text Block */}
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-6 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 uppercase"
                    >
                        Launching June 2026
                    </motion.div>

                    <h2 className="mb-16 text-4xl md:text-5xl font-semibold leading-tight text-white transition-opacity">
                        Meet <span className="gradient-text font-bold">Drow</span> — The Future of Product Development
                    </h2>

                    <p className="mb-28 text-lg leading-relaxed text-gray-400">
                        Drow is our flagship internal product designed to streamline the
                        entire development lifecycle. Stay efficient, scale faster, and
                        deliver unmatched results with our automated workflow engine.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="saas-input h-12 flex-1 outline-none"
                        />
                        <Button type="submit" variant="primary">
                            Notify Me
                        </Button>
                    </form>
                </div>

                {/* Right: Graphic/Card Placeholder */}
                <div className="flex-1 w-full max-w-[600px]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative p-6 bg-gradient-to-br from-indigo-900/50 to-indigo-900/20 rounded-3xl border border-indigo-500/20 shadow-2xl overflow-hidden aspect-video flex items-center justify-center group"
                    >
                        {/* Minimal Drow UI Placeholder */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
                        </div>

                        <div className="z-10 text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-400 group-hover:scale-110 transition-transform">
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">Interactive Preview</p>
                        </div>

                        {/* Float decorative elements */}
                        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />
                        <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-indigo-600/20 blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
