import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SectionWrapper } from '../components/SectionWrapper';

import doctorsHomeImg from '../assets/Doctors_Home.webp';
import homeImg from '../assets/Home.webp';
import ratingsImg from '../assets/Ratings.webp';

export function Product() {
    return (
        <SectionWrapper id="drow" withDots>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Left: Text Block */}
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-flex rounded-full recessed-icon px-4 py-1.5 text-xs font-semibold tracking-wide text-[#4a5568] uppercase"
                    >
                        Launching June 2026
                    </motion.div>

                    <h2 className="mb-16 text-4xl md:text-5xl font-semibold leading-tight text-[#2d3436] transition-opacity">
                        Meet <span className="gradient-text font-bold">Drow</span> — The Future of Product Development
                    </h2>

                    <p className="mb-28 text-lg leading-relaxed text-[#4a5568]">
                        Drow is our flagship Mobile App product designed And Maintained by the
                        entire DropNotch. Product will be soon in the Market..
                    </p>
                    <div className='mt-10 p-4'>
                        <form className="flex flex-col sm:flex-row gap-6">
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
                </div>

                {/* Right: Interactive Preview / Screenshots */}
                <div className="flex-1 w-full lg:max-w-none flex justify-center mt-12 lg:mt-0">
                    <div className="relative flex items-center justify-center gap-4 sm:gap-8 w-full max-w-[600px] h-full py-10">
                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-600/30 blur-[80px] rounded-full z-0 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cyan-500/20 blur-[60px] rounded-full z-0 pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="z-10 w-[30%] sm:w-1/3 transform hover:scale-105 hover:rotate-0 hover:z-30 transition-all duration-300"
                        >
                            <img src={homeImg} alt="Drow Home" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] object-cover" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="z-20 w-[35%] sm:w-1/3 translate-y-[-1rem] sm:translate-y-[-2rem] transform hover:scale-110 hover:z-30 transition-all duration-300 relative"
                        >
                            <img src={doctorsHomeImg} alt="Drow Doctors" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] object-cover" />
                            {/* Floating tag */}
                            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 bg-[#f0f2f5] border border-[#babecc] text-[#2d3436] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-[4px_4px_8px_#babecc,-4px_-4px_8px_#ffffff]">
                                Interactive
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="z-10 w-[30%] sm:w-1/3 transform hover:scale-105 hover:rotate-0 hover:z-30 transition-all duration-300"
                        >
                            <img src={ratingsImg} alt="Drow Ratings" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[8px_8px_16px_#babecc,-8px_-8px_16px_#ffffff] object-cover" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
