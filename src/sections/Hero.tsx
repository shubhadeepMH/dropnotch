import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { fadeInUp, staggerContainer } from '../utils';

export function Hero() {
    return (
        <section id="home" className="relative flex min-h-screen items-center py-24 overflow-hidden">
            {/* Background ambient accents */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
            </div>

            <div className="container-global relative z-10 flex flex-col items-center justify-center text-center">
                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white mb-14"
                    >
                        Empowering Startups with
                        <span className="gradient-text block">Premium Solutions</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-gray-300 mb-24 max-w-2xl mx-auto"
                    >
                        We merge high-end product development with expert freelance
                        services to scale your vision into reality. Launching the next
                        generation of Products.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="h-10 w-[2px] bg-gradient-to-b from-gray-700 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}
