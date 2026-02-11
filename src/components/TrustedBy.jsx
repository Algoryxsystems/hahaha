import React from 'react';
import { motion } from 'framer-motion';

const companies = [
    "CYBERDYNE", "STARK ENT", "WAYNE CORP", "TYRELL", "OSCORP", "OMNICP", "TETRA", "SPECTRE"
];

const TrustedBy = () => {
    return (
        <section id="trusted" style={{
            minHeight: 'auto',
            padding: '80px 0',
            background: 'transparent',
            border: 'none'
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
                        Trusted by industry leaders in infrastructure
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '40px',
                        flexWrap: 'wrap',
                        opacity: 0.5,
                        filter: 'grayscale(100%) brightness(200%)'
                    }}>
                        {companies.map((company, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, opacity: 1, filter: 'grayscale(0%) brightness(100%)' }}
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    color: '#fff',
                                    letterSpacing: '2px',
                                    transition: '0.3s'
                                }}
                            >
                                {company}
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Right side empty column - stacks on mobile naturally */}
                <div className="desktop-only" />
            </div>
        </section>
    );
};

export default TrustedBy;
