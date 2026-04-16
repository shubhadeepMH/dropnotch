import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { staggerContainer } from '../utils';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
    id: string;
    children: ReactNode;
    className?: string;
    withDots?: boolean;
}

export function SectionWrapper({
    id,
    children,
    className = '',
    withDots = false,
}: SectionWrapperProps) {
    const [ref, isInView] = useInView(0.08);

    return (
        <section
            id={id}
            ref={ref}
            className={`relative section-spacing ${withDots ? 'dot-grid' : ''} ${className}`}
        >
            <motion.div
                className="container-global"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {children}
            </motion.div>
        </section>
    );
}
