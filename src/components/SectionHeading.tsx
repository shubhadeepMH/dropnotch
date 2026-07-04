import { motion } from 'framer-motion';
import { fadeInUp } from '../utils';

interface SectionHeadingProps {
    label?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

export function SectionHeading({
    label,
    title,
    description,
    align = 'center',
}: SectionHeadingProps) {
    const isCenter = align === 'center';

    return (
        <motion.div
            className={`mb-24 ${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'
                }`}
            variants={fadeInUp}
        >
            {label && (
                <span className="mb-4 inline-block rounded-full recessed-icon px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#4a5568]">
                    {label}
                </span>
            )}
            <h2
                className={`${label ? 'mt-6' : ''
                    } text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[#2d3436]`}
            >
                {title}
            </h2>
            {description && (
                <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#4a5568]">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
