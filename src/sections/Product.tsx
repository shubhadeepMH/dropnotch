import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SectionWrapper } from '../components/SectionWrapper';

import doctorsHomeImg from '../assets/Doctors_Home.png';
import homeImg from '../assets/Home.png';
import ratingsImg from '../assets/Ratings.png';

export function Product() {
    return (
        <SectionWrapper id="drow" withDots>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Left: Text Block */}
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 uppercase"
                    >
                        Launching June 2026
                    </motion.div>

                    <h2 className="mb-16 text-4xl md:text-5xl font-semibold leading-tight text-white transition-opacity">
                        Meet <span className="gradient-text font-bold">Drow</span> — The Future of Product Development
                    </h2>

                    <p className="mb-28 text-lg leading-relaxed text-gray-400">
                        Drow is our flagship Mobile App product designed And Maintained by the
                        entire DropNotch. Product will be soon in the Market..
                    </p>
                    <div className='mt-10 p-4'>
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
                </div>

                {/* Right: Interactive Preview / Screenshots */}
                <div className="flex-1 w-full lg:max-w-none flex justify-center mt-12 lg:mt-0">
                    <div className="relative flex items-center justify-center gap-3 sm:gap-6 w-full max-w-[600px] h-full py-10">
                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-600/30 blur-[80px] rounded-full z-0 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cyan-500/20 blur-[60px] rounded-full z-0 pointer-events-none" />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 50, rotate: -5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="z-10 w-[30%] sm:w-1/3 transform hover:scale-105 hover:rotate-0 hover:z-30 transition-all duration-300"
                        >
                            <img src={homeImg} alt="Drow Home" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-indigo-500/20 object-cover" />
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="z-20 w-[35%] sm:w-1/3 translate-y-[-1rem] sm:translate-y-[-2rem] transform hover:scale-110 hover:z-30 transition-all duration-300 relative"
                        >
                            <img src={doctorsHomeImg} alt="Drow Doctors" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-4 ring-indigo-500/40 border border-white/10 object-cover" />
                            {/* Floating tag */}
                            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-indigo-500/30 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                                Interactive
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 50, rotate: 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="z-10 w-[30%] sm:w-1/3 transform hover:scale-105 hover:rotate-0 hover:z-30 transition-all duration-300"
                        >
                            <img src={ratingsImg} alt="Drow Ratings" className="w-full rounded-2xl sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-indigo-500/20 object-cover" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
