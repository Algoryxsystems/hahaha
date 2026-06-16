import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: "What is Algoryx?",
        a: "We're a software studio. We design, build, and ship products like developer tools, AI utilities, and SaaS portals."
    },
    {
        q: "What are you currently working on?",
        a: "Our main project is Breakpoint, a security analysis tool. We also build browser extensions, WebGL libraries, and utility scripts."
    },
    {
        q: "Are these projects related?",
        a: "They are all built by the same core team at Algoryx, but each project runs independently with its own repository and roadmap."
    },
    {
        q: "How can we collaborate?",
        a: "If you're a developer, founder, or looking to partner with us, drop us a line at contact@algoryx.com."
    },
    {
        q: "Do you do client work?",
        a: "Mainly we build our own tools, but we occasionally partner with teams on custom WebGL, graphics, or systems projects. Let's chat."
    }
];

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <section id="faq" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px' }}>
                        Common <span className="gradient-text">Questions</span>
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                overflow: 'hidden'
                            }}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                style={{
                                    width: '100%',
                                    padding: 'clamp(18px, 4vw, 24px)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'transparent',
                                    textAlign: 'left',
                                    color: '#fff',
                                    gap: '15px'
                                }}
                            >
                                <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', fontWeight: 600 }}>{faq.q}</span>
                                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} style={{ flexShrink: 0 }}>
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIdx === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 24px 24px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
