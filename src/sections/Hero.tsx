import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { fadeInUp, staggerContainer } from '../utils';

export function Hero() {
    return (
        <section id="home" className="relative flex min-h-screen items-center py-24 overflow-hidden">
            <div className="container-global relative z-10 flex flex-col items-center justify-center text-center">
                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Text Content Wrapper */}
                    <motion.div variants={fadeInUp} className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#2d3436]">
                            Empowering Startups with
                            <span className="gradient-text block">Premium Solutions</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#4a5568] max-w-2xl mx-auto">
                            We merge high-end product development with expert freelance
                            services to scale your vision into reality. Launching the next
                            generation of Products.
                        </p>
                    </motion.div>

                    {/* Explicit Spacer */}
                    <div className="h-16 lg:h-24"></div>

                    {/* Buttons Wrapper */}
                    <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Button href="#contact" variant="primary">
                        Get Started
                    </Button>
                    <Button href="#services" variant="outline">
                        View Services
                    </Button>
                </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-[#4a5568]">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="h-10 w-[2px] bg-gradient-to-b from-[#babecc] to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}