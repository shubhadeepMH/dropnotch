import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionHeading, Button, SectionWrapper } from '../components';
import { fadeInUp } from '../utils';

export function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Safety check: ensure the form ref is actually bound to the DOM element
        if (!form.current) return;

        setStatus('submitting');

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAIL_SERVICE_ID as string,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID as string,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY as string,
                }
            )
            .then(
                () => {
                    console.log('SUCCESS!');
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                },
                (error) => {
                    // Check console to see if it's a 401 (Auth) or 404 (ID mismatch) error
                    console.error('FAILED...', error);
                    alert(`Failed to send: ${error.text}`);
                    setStatus('idle');
                }
            );
    }

    return (
        <SectionWrapper id="contact" withDots>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div className="text-left">
                        <SectionHeading
                            label="Contact Us"
                            title="Let's Build Something Great Together"
                            description="Have a question or a project in mind? We'd love to hear from you. Our team will get back to you within 24 hours."
                            align="left"
                        />
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="overflow-hidden p-0 text-left"
                    >
                        {status !== 'success' ? (
                            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="saas-input h-12"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="saas-input h-12"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                                        How can we help?
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your project..."
                                        className="saas-input resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full h-14 mt-2 text-lg"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                                </Button>
                            </form>
                        ) : (
                            <motion.div
                                className="flex flex-col items-center py-10 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400 shadow-xl shadow-cyan-500/10 transition-transform">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                                <p className="max-w-xs text-center text-gray-400 mb-8">
                                    Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                                </p>
                                <Button variant="outline" className="w-full" onClick={() => setStatus('idle')}>
                                    Send another message
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
