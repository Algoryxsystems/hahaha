import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section id="cta" style={{ textAlign: 'center', minHeight: 'auto', padding: '100px 5%', background: '#000000' }}>
            <div className="glass-card" style={{
                maxWidth: '1100px',
                width: '100%',
                margin: '0 auto',
                padding: 'clamp(50px, 10vw, 100px) clamp(20px, 5vw, 40px)',
                background: 'radial-gradient(circle at top right, rgba(112, 0, 255, 0.15), transparent), rgba(255, 255, 255, 0.02)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, color: '#fff' }}>
                        Time is a business asset. <br />
                        <span className="gradient-text">We help you reclaim it.</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '48px', fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', maxWidth: '650px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                        Operational acceleration must never compromise system integrity. Join the evolution of operational intelligence.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary" style={{ padding: '16px 48px', fontSize: '1.1rem', width: 'clamp(250px, 100%, 300px)' }}>
                            Request a Consultation
                        </button>
                        <button style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '16px 48px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            width: 'clamp(250px, 100%, 300px)',
                            transition: '0.3s'
                        }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            Talk to Sales
                        </button>
                    </div>
                </motion.div>

                {/* Decorative Blobs */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(112, 0, 255, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
            </div>
        </section>
    );
};

export default CTA;
