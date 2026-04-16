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
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="relative z-10 flex flex-col items-center text-center h-full">
                {children}
            </div>

            {/* Subtle hover glow accent */}
            <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-indigo-600/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
        </motion.div>
    );
}
