import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '../components';
import { fadeInUp } from '../utils';

export function About() {
    return (
        <SectionWrapper id="about" className="min-h-[80vh] flex items-center py-24">
            <div className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center">
                <SectionHeading
                    label="Our Story"
                    title="Rooted in Craft, Built for Scale"
                    align="center"
                />

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12 text-lg md:text-xl leading-relaxed text-gray-400"
                >
                    <p>
                        DropNotch is a product development studio and service-based startup
                        focused on delivering high-performance digital experiences. We bridge the
                        gap between visionary design and hardcore engineering.
                    </p>
                    <p>
                        Whether it&apos;s crafting bespoke solutions for startups or scaling
                        our own flagship platforms like Drow, we prioritize quality, speed,
                        and user impact in everything we build.
                    </p>

                    {/* Integrated Brand Info moved from Footer */}
                    <div className="pt-16 mt-20 flex flex-col items-center gap-6">
                        <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-gray-400 font-medium">
                            DropNotch is a service-based startup and product-focused studio
                            building high-performance digital solutions for the next
                            generation of businesses.
                        </p>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
