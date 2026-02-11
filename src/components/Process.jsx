import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { number: "01", title: "Process Analysis", desc: "Identify delays and inefficiencies in your current execution pipelines." },
    { number: "02", title: "System Engineering", desc: "Design optimized frameworks tailored to your organizational needs." },
    { number: "03", title: "Deployment", desc: "Implement scalable solutions with minimal disruption to ongoing operations." },
    { number: "04", title: "Performance Optimization", desc: "Continuously monitor and enhance output for maximum precision." }
];

const Process = () => {
    return (
        <section id="process" style={{ background: '#000000' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px' }}>
                        The <span className="gradient-text">Algoryx Workflow</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
                        A precision-engineered approach to transforming your operational potential.
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
