import React from 'react';
import { motion } from 'framer-motion';

const BreakpointStats = [
    "UNRESTRICTED", "VULNERABILITY", "DETECTION", "ENGINE", "ENGINEERED", "IDENTIFY", "ELIMINATE", "RISKS"
];

const ImpactStatement = () => {
    return (
        <section id="impact" style={{
            minHeight: 'auto',
            padding: '80px 0',
            background: 'transparent',
            border: 'none',
            position: 'relative',
            zIndex: 2
        }}>
            <div className="container responsive-grid">
                <div>
                    <p style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.3em',
                        marginBottom: '30px',
                        textTransform: 'uppercase'
                    }}>
                        BREAKPOINT: NEW STANDARD IN SECURITY INTELLIGENCE
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '40px',
                        flexWrap: 'wrap',
                        opacity: 0.5,
                        filter: 'grayscale(100%) brightness(200%)'
                    }}>
                        {BreakpointStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, opacity: 1, filter: 'grayscale(0%) brightness(100%)' }}
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    color: '#fff',
                                    letterSpacing: '2px',
                                    transition: '0.3s',
                                    cursor: 'default'
                                }}
                            >
                                {stat}
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Right side empty column - matches original layout container */}
                <div className="desktop-only" />
            </div>
        </section>
    );
};

export default ImpactStatement;
