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
                <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                    {label}
                </span>
            )}
            <h2
                className={`${label ? 'mt-6' : ''
                    } text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white`}
            >
                {title}
            </h2>
            {description && (
                <p className="mt-8 text-base sm:text-lg leading-relaxed text-gray-300">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
