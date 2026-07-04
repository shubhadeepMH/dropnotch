import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeading } from '../components';
import { fadeInUp, staggerContainer } from '../utils';

import image1 from '../assets/image_1.png';
import image2 from '../assets/image_2.png';
import image3 from '../assets/image_3.png';

const services = [
    {
        title: 'Product Engineering',
        description: 'We build scalable, high-performance Web and Mobile applications tailored to your business goals.',
        icon: (
            <svg className="h-6 w-6 text-[#ff4757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        image: image2,
    },
    {
        title: 'Digital Design',
        description: 'Crafting user-centric UI/UX and visual identities on Web And Apps that resonate with your customers.',
        icon: (
            <svg className="h-6 w-6 text-[#ff4757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        image: image3,
    },
    {
        title: 'Consultancy',
        description: 'Strategic advice on digital transformation and infrastructure scaling for modern startups.',
        icon: (
            <svg className="h-6 w-6 text-[#ff4757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        image: image1,
    },
];

export function Services() {
    return (
        <SectionWrapper id="services">
            <SectionHeading
                label="Services"
                title="We Drive Impactful Results"
                align="center"
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 lg:grid-cols-3"
            >
                {services.map((service) => (
                    <motion.div
                        key={service.title}
                        variants={fadeInUp}
                        className="saas-card text-center flex flex-col items-center group overflow-hidden"
                    >
                        {/* Image Section */}
                        <div className="w-full relative h-48 mb-8 overflow-hidden rounded-xl">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Icon and Text Content */}
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl recessed-icon -mt-12 relative z-10">
                            {service.icon}
                        </div>

                        <h3 className="mb-4 text-xl font-semibold text-[#2d3436]">
                            {service.title}
                        </h3>
                        <p className="text-[0.9375rem] leading-relaxed text-[#4a5568]">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
