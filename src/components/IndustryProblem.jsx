import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const IndustryProblem = () => {
    return (
        <section id="about" style={{
            background: 'transparent',
            padding: '120px 0',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="container responsive-grid">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 20px',
                        borderRadius: '30px',
                        background: 'rgba(112, 0, 255, 0.05)',
                        border: '1px solid rgba(112, 0, 255, 0.15)',
                        color: 'var(--accent-purple)',
                        marginBottom: '30px',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        <Layers size={18} />
                        THE MISSION
                    </div>

                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '30px', lineHeight: 1.1, color: 'white' }}>
                        We write code <br />
                        <span className="gradient-text">that scales.</span>
                    </h2>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        lineHeight: 1.6,
                        marginBottom: '40px',
                        fontWeight: 300
                    }}>
                        Software has gotten too complicated. Stack traces are too long, configuration files are too big, and integration takes weeks. We build clean, modular tools that let engineers get back to coding.
                    </p>

                    <div className="glass-card" style={{
                        padding: '30px',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px'
                    }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', fontStyle: 'italic', margin: 0 }}>
                            "Our philosophy is simple: write fast code, document everything, and ship early. If it doesn't solve a real problem, we don't build it."
                        </p>
                    </div>
                </motion.div>

                {/* Right side spacer for particles/logo on desktop */}
                <div className="desktop-only" />
            </div>
        </section>
    );
};

export default IndustryProblem;
