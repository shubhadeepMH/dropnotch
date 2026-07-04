import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <motion.div
            className={`saas-card group ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
            <div className="relative z-10 flex flex-col items-center text-center h-full">
                {children}
            </div>
        </motion.div>
    );
}
