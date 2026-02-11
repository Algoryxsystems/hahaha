import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const IndustryProblem = () => {
    return (
        <section id="problem" style={{
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
                        background: 'rgba(255, 0, 0, 0.05)',
                        border: '1px solid rgba(255, 0, 0, 0.1)',
                        color: '#ff4d4d',
                        marginBottom: '30px',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        <AlertCircle size={18} />
                        THE INDUSTRY CHALLENGE
                    </div>

                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '30px', lineHeight: 1.1, color: 'white' }}>
                        Inefficiency is a <br />
                        <span className="gradient-text-pink">Structural Business Risk.</span>
                    </h2>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        lineHeight: 1.6,
                        marginBottom: '40px',
                        fontWeight: 300
                    }}>
                        Across industries, operational delays, manual dependencies, and disconnected systems lead to measurable time loss, increased costs, and reduced scalability.
                    </p>

                    <div className="glass-card" style={{
                        padding: '30px',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px'
                    }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', fontStyle: 'italic', margin: 0 }}>
                            "Organizations often possess the resources to grow but are constrained by inefficient execution pipelines. Time inefficiency is not an operational inconvenience — it is a structural business risk."
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
