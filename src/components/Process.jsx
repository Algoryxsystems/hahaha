import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { number: "01", title: "Find the problem", desc: "Figure out what's broken, what's slow, or what could be engineered better." },
    { number: "02", title: "Build a prototype", desc: "Code a quick version to test feasibility, performance, and user experience." },
    { number: "03", title: "Ship it", desc: "Deploy the first stable release and invite developers to break it." },
    { number: "04", title: "Iterate & polish", desc: "Fix bugs, optimize bottlenecks, and add features based on actual use." }
];

const Process = () => {
    return (
        <section id="process" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px' }}>
                        How we <span className="gradient-text">build things</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
                        Our process is straightforward. No endless meetings, just iterative shipping.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px'
                }}>
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                position: 'relative',
                                padding: '40px',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                overflow: 'hidden'
                            }}
                        >
                            <span style={{
                                fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                                fontWeight: 900,
                                opacity: 0.1,
                                position: 'absolute',
                                top: '-10px',
                                right: '10px',
                                color: 'var(--accent-purple)',
                                pointerEvents: 'none'
                            }}>
                                {step.number}
                            </span>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', position: 'relative', zIndex: 1, color: '#fff' }}>{step.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, position: 'relative', zIndex: 1, fontSize: '0.95rem' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
